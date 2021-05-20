const User = require("./../models/userModel");
const chatModel = require("../models/chatModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { v4: uuid_v4 } = require("uuid");

const SignToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = SignToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  user.password = undefined;
  res.status(statusCode).json({
    status: "OK",
    token: token,
    data: {
      user,
    },
  });
};

exports.signUp = async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  createSendToken(newUser, 201, req, res);
};

exports.login = async (req, res, next) => {
  const DReq = { ...req.body };
  const username = DReq.username;
  const password = DReq.password;
  if (!password || !username) {
    return res.status(500).json({
      message: "Username or password required",
    });
  }
  const user = await User.findOne({ username: username }).select("+password");
  if (user && (await user.CheckPass(password, user.password))) {
    createSendToken(user, 200, req, res);
  } else {
    return res.status(401).json({
      message: "username and Password is not correct",
    });
  }
};

exports.logout = (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    token: "",
    status: "OK",
  });
};

exports.protectAccess = async (req, res, next) => {
  let token = undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (req.cookies && req.cookies.jwt) token = req.cookies.jwt;
  if (req.body && req.body.token) token = req.body.token;
  if (req.query && req.query.token) token = req.query.token;

  if (!token) {
    return res.status(401).json({
      message: "You are not logged in",
    });
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
};

exports.isLoggedIn = async (req, res, next) => {
  let token = undefined;
  if (req.cookies && req.cookies.jwt) token = req.cookies.jwt;
  if (req.body && req.body.token) token = req.body.token;
  if (req.query && req.query.token) token = req.query.token;
  console.log("params: ", token);
  if (!token) {
    return res.status(401).json({
      message: "You are not logged in",
    });
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  req.user = currentUser;
  res.locals.user = currentUser;
  return res.status(200).json({
    message: "user is loggedIn",
    user: currentUser,
  });
};
exports.assignRoom = async (req, res) => {
  // console.log("I camehere bhai");
  const userId = req.user.id;
  const assignWith = req.params.chatWithUsername;
  if (assignWith == req.user.username) {
    return res.status(401).json({
      message: "You are not allowed chat with yourself here",
    });
  }
  // console.log("Came here");
  // console.log(assignWith);
  const searchUser = await User.findOne({ username: assignWith });
  if (searchUser) {
    var found = false,
      foundData;
    req.user.chatWith.map((ele) => {
      if (ele.chatUsername == searchUser.username) {
        found = true;
        foundData = ele;
      }
    });
    if (found) {
      return res.status(200).json({
        message: "OK",
        roomId: foundData.roomId,
      });
    } else {
      const newRoomId = uuid_v4();
      searchUser.chatWith.push({
        chatUsername: req.user.username,
        roomId: newRoomId,
      });
      const currentUser = await User.findById(req.user.id);
      currentUser.chatWith.push({
        chatUsername: assignWith,
        roomId: newRoomId,
      });
      await currentUser.save({ validateBeforeSave: false });
      await searchUser.save({ validateBeforeSave: false });
      return res.status(200).json({
        message: "OK",
        roomId: newRoomId,
      });
    }
  }
  return res.status(404).json({
    message: "no user found with that username",
  });
};

exports.currentUser = async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });
  if (user) {
    req.user = user;
  } else {
    return res.staus(404).json({
      message: "Not Authorized",
    });
  }
  next();
};
