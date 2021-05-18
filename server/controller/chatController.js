const chatModel = require("../models/chatModel");
const User = require("../models/userModel");

exports.startChat = async (req, res, next) => {
  // const endUser = await User.find({
  //   username: req.body.username,
  // });
  // if (endUser) {
  //   const createChat = await chatModel.create({
  //     message: req.body.message,
  //     sender: req.body.sender,
  //     reciever: endUser[0].id,
  //     createDate: Date.now(),
  //   });
  //   return res.status(200).json({
  //     status: "success",
  //     message: createChat,
  //   });
  // }
  res.status(400).json({
    status: "fail",
    message: "No Reciever Found",
  });
};
