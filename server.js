const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
// const io = require("socket.io")
const { createServer } = require("http")
const { Server } =  require("socket.io")
dotenv.config();

const app = express();
const httpServer = createServer(app);
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

  // Socket IO=========================================================

  const io = new Server(httpServer,{
    cors: {
        origin: ["https://www.view.chatbook.live/", "http://localhost:3000",],
    },
  })
  
  let users = [];
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  
  io.on("connection", (socket) => {
    //when connected
    console.log("user connected");
    //take user id socket id from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get messages
    socket.on("sendMessage", ({ senderId, reciverId, text }) => {
      const user = getUser(reciverId)
      console.log('user->', user);
      io.to(user.socketId).emit('getMessage', {
          senderId,
          text
      })
    });
    
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
  
  // Socket IO================================================================






const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`);
});
