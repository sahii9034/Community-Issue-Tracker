const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  reportedBy: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Pending", // or "Resolved", "In Progress"
  }
});

module.exports = mongoose.model("Issue", issueSchema);
