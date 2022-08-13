const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, "DO NOT LEAVE BLANK!"],
      trim: true,
      maxlength: 150,
    },
    body: {
      type: String,
      required: [true, "REQUIRED!"],
      trim: true,
      maxlength: 2000,
    },
    category: {
      type: String,
      enum: [
        "tech",
        "sport",
        "science",
        "politics",
        "life",
        "food",
        "education",
        "travel",
        "health",
      ],
      required: [true, "PLEASE CHOOSE AN APPROPRIATE CATEGORY"],
    },
    likes: {
      type: Array,
      default: [],
    },
    image: {
      type: String,
    },
    anon: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//connect posts and comments
PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

module.exports = mongoose.model("Post", PostSchema);
