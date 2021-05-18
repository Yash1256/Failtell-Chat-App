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
    ref: "user",
  },
  reciever: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
});
chatSchema.index({ sender: 1 });
chatSchema.index({ reciever: 1 });
mongoose.exports = mongoose.model("Chat", chatSchema);
