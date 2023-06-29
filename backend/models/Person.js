const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2 },
    empid: { type: mongoose.Schema.Types.ObjectId, ref: "Emp" },
  },
  {
    versionKey: false, // for __v : 0
  }
);

module.exports = mongoose.model("persons", personSchema);
