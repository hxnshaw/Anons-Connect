const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, "DO NOT LEAVE BLANK!"],
      trim: true,
      maxlength: 100,
    },
    body: {
      type: String,
      required: [true, "REQUIRED!"],
      trim: true,
      maxlength: 1000,
    },
    image: {
      type: String,
      default: "/connect/image.jpeg",
    },
    anon: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Post", PostSchema);
