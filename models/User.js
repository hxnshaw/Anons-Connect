const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "USERNAME NOT AVAILABE, PLEASE CHOOSE ANOTHER."],
      required: [true, "PLEASE ENTER YOUR USERNAME"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "EMAIL ADDRESS IS REQUIRED"],
      trim: true,
      unique: [true, "EMAIL ADDRESS NOT AVAILABE, PLEASE CHOOSE ANOTHER."],
      validate: {
        validator: validator.isEmail,
        message: "PLEASE ENTER A VALID EMAIL ADDRESS",
      },
    },
    password: {
      type: String,
      required: [true, "PLEASE ENTER YOUR PASSWORD"],
      trim: true,
      minlength: 7,
    },
    age: {
      type: Number,
      required: [true, "PLEASE ENTER YOUR AGE"],
      validate(value) {
        if (value < 18) {
          throw new Error("YOU MUST BE 18 AND ABOVE TO REGISTER");
        }
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
