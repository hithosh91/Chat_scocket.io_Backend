const mongooes = require("mongoose");

const messageSchema = new mongooes.Schema(
  {
    senderId: {
      type: mongooes.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongooes.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongooes.model("Message", messageSchema);
