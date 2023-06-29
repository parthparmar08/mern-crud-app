const empModel = require("../models/Emp");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const JWT_SECRET = "secretkey";

exports.display1 = async (req, res) => {
  var data = await empModel.find();
  return res.json(data);
};

exports.display2 = async (req, res) => {
  var data = await empModel.findOne({ _id: req.query.id });
  return res.json(data);
};

exports.display3 = async (req, res) => {
  var data = await empModel.find({ name: req.query.name });
  return res.json(data);
};

exports.insert1 = async (req, res) => {
  try {
    const data = new empModel({
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      salary: req.body.salary,
      dept: req.body.dept,
      role: req.body.role
    });
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    data.password = hashedPassword;
    const savedata = await data.save();
    return res.status(200).json(savedata);
  } catch (err) {
    return res.status(404).json(err);
  }
};

exports.update1 = async (req, res) => {
  try {
    const data = await empModel.updateOne(
      { _id: req.body.id },
      {
        $set: {
          name: req.body.name,
          gender: req.body.gender,
          age: req.body.age,
          salary: req.body.salary,
          dept: req.body.dept,
          role: req.body.role,
        },
      }
    );
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.delete1 = async (req, res) => {
  try {
    const data = await empModel.deleteOne({ _id: req.query.id });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
};

//$match Aggregation
//display data acording to department
exports.aggregate1 = async (req, res) => {
  try {
    let filter = req.body;
    let data = {};
    if (filter.dept) {
      data.dept = filter.dept;
    }

    const result = await empModel.aggregate([{ $match: data }]);
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
};

//$group Aggregation
//display total salary of department
exports.aggregate2 = async (req, res) => {
  try {
    let filter = req.body;
    let data = {};
    if (filter.dept) {
      data.dept = filter.dept;
    }
    const result = await empModel.aggregate([
      { $match: data },
      { $group: { _id: "$dept", total: { $sum: "$salary" } } },
    ]);
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
};

//$sort Aggregation -Reorders the document stream by a specified sort key
//group all department in ascending order (total employee in each department)
exports.aggregate3 = async (req, res) => {
  try {
    const result = await empModel.aggregate([
      { $group: { _id: "$dept", Total_Employee: { $sum: 1 } } },
      { $sort: { _id: 1 } }, // if you give -1 it will in descending order
    ]);
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
};

//$project and $unwind Aggregation
//$project - Reshapes each document in the stream
//$unwind - Breaks an array field from the input documents and outputs one document for each element.
exports.aggregate4 = async (req, res) => {
  try {
    const result = await empModel.aggregate([
      { $project: { name: 1, gender: 1, age: 1, skills: 1 } },
      { $unwind: "$skills" },
    ]);
    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
};

//empModel.aggregate([{$match:{salary:{$gt:4000}}}])    //whose salary > 4000

exports.login1 = async (req, res) => {
  try {
    const user = await empModel.findOne({ name: req.body.name });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    return res.status(200).json({ message: "Login Sucessfully", token: token });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
