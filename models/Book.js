const mongoose = require("mongoose");


const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    author: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    summary:{
      type: String,
      required: true,
      minlength: 50,
      maxlength: 5000,
    }
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
