const User = require("../models/User");
const Post = require("../models/Post");

exports.getallpost = async (req, res) => {
  try {
    const posts = await Post.find().populate(
      "user",
      "first_name last_name picture username cover email"
    ).sort({createdAt:-1});
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getallusers = async (req, res) => {
  try {
    const users = await User.find({ admin: false }).select("-password").sort({createdAt:-1});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.blockPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    if (post.block) {
      await Post.findByIdAndUpdate(id, {
        block: false,
      });
      return res.status(200).json("Post is unblocked");
    } else {
      await Post.findByIdAndUpdate(id, {
        block: true,
      });

      return res.status(200).json("Post is blocked");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.blockUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (user.block) {
      await User.findByIdAndUpdate(id, {
        block: false,
      });
      return res.status(200).json("User is unblocked");
    } else {
      await User.findByIdAndUpdate(id, {
        block: true,
      });
      return res.status(200).json("User is unblocked");
    }
  } catch (error) {}
};
