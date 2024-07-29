const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../utils/config");

// TaskSchema
const TaskSchema = mongoose.Schema({
  text: { type: String },
  day: { type: String },
  reminder: { type: Boolean },
  user_id: { type: String, required: true },
});

TaskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Task = module.exports = mongoose.model("Task", TaskSchema);
