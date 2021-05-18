const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Number,
    default: Date.now(),
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  reciever: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});
chatSchema.index({ sender: 1 });
chatSchema.index({ reciever: 1 });

module.exports = mongoose.model("Chat", chatSchema);
