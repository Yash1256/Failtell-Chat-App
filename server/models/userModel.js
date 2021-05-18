const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 10,
    select: false,
  },
  chatWith: [
    {
      chatUsername: String,
      roomId: String,
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.password) return;
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.CheckPass = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
