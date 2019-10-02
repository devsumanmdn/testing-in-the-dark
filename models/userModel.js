const mongoose = require("mongoose");
const { primaryDB } = require("../config/mongoose.config");

const {
  Schema: {
    Types: { ObjectId }
  }
} = mongoose;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 20,
    required: true
  },
  timeZone: {
    type: String,
    default: "Asia/Calcutta"
  },
  slots: [
    {
      startTime: Date,
      endTime: Date,
      userId: {
        type: ObjectId,
        ref: "User"
      }
    }
  ]
});

const User = primaryDB.model("User", userSchema);

module.exports = User;
