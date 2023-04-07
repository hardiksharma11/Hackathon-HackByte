const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const validator = require('validator');

const Schema=mongoose.Schema

const UserSchema = new Schema(
  {
    name: { type: String, required: [true, "Please provide a name"] },
    username: {
      required: [true, 'Please provide Username !'],
      type: String,
      unique: [true, 'Username already taken !']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
    },
    about:{
      type:String
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false, // Whenever we query for a user, do we want to return password as well
    },
    profilePic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", // Default profile pic
    },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    resetPasswordToken: String, // String is shorthand for {type: String}
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Middleware before saving a document
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Assign a "matchPasswords" function to the "methods" object of our "UserSchema"
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRE}h`, // In hours
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Expires in 10 min

  return resetToken;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
