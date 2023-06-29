const mongoose = require("mongoose");

const empSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2 },
    gender: { type: String, required: true, enum: ["male", "female"] },
    age: { type: String, required: true, min: 18, max: 100 },
    salary: { type: String, required: true, min: 0 },
    dept: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "employee"] },
  },
  {
    versionKey: false, // for __v : 0
  }
);

module.exports = mongoose.model("emps", empSchema);
