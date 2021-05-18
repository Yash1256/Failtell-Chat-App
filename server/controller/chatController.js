const chatting = require(`${__dirname}/../models/chatModel`);
const User = require("./../models/userModel");

exports.startUserChat = async (req, res, next) => {
  if (req.body.username === req.user.username) {
    return res.status(400).json({
      status: "Fail",
      message: "You can't talk to yourself",
    });
  }
  const endUser = await User.find({
    username: req.body.username,
  });
  console.log(req.user);
  if (endUser) {
    const createdChat = await chatting.create({
      message: req.body.message,
      sender: req.user.id,
      reciever: endUser[0].id,
      createdDate: Date.now(),
    });
    return res.status(200).json({
      status: "success",
      message: createdChat,
    });
  }
  res.status(400).json({
    status: "fail",
    message: "No Reciever Found",
  });
};

exports.getUserChats = async (req, res) => {
  console.log(req.query);
  const getChat = await chatting
    .find({
      $or: [
        {
          sender: req.user.id,
          reciever: req.query.recieverUserId,
        },
        {
          sender: req.query.recieverUserId,
          reciever: req.user.id,
        },
      ],
    })
    .sort({ createdDate: 1 });
  if (getChat.length > 0) {
    return res.status(200).json({
      status: "ok",
      getChat,
    });
  }
  res.status(400).json({
    status: "fail",
    message: "No Chat Found",
  });
};

exports.deleteUserChat = async (req, res, next) => {
  const deleteChat = await chatting.findOneAndDelete({
    _id: req.query.id,
    sender: req.user.id,
  });
  if (deleteChat) {
    return res.status(200).json({
      status: "Ok",
      message: "Chat Deleted Successfully",
    });
  }
  res.status(400).json({
    status: "fail",
    message: "You can't Delete other's chats",
  });
};

exports.updateUserChat = async (req, res) => {
  const updateChat = await chatting.findByIdAndUpdate(req.body.id, {
    message: req.body.message,
  });
  if (updateChat) {
    return res.status(200).json({
      status: "Ok",
      message: updateChat,
    });
  }
  res.status(400).json({
    status: "fail",
    message: "Can Update only your chat's",
  });
};
