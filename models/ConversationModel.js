const mongooes = require("mongoose");

const converationSchema = new mongooes.Schema(
  {
    participants: [
      {
        type: mongooes.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongooes.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongooes.model("Conversation", converationSchema);
