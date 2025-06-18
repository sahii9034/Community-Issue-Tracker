const Issue = require("../models/issueModel");

// POST /api/issues — Create a new issue
const createIssue = async (req, res) => {
  try {
    const {
      name,
      phone,
      title,
      category,
      location,
      pincode,
      description,
      image,
    } = req.body;

    // Validate required fields
    if (!name || !phone || !title || !category || !location || !pincode || !description) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newIssue = new Issue({
      name,
      phone,
      title,
      category,
      location,
      pincode,
      description,
      image,
    });

    await newIssue.save();
    res.status(201).json({ message: "Issue reported successfully!", issue: newIssue });
  } catch (error) {
    console.error("Error reporting issue:", error);
    res.status(500).json({ message: "Server error while reporting issue." });
  }
};

// GET /api/issues — Fetch all issues
const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching issues." });
  }
};

module.exports = {
  createIssue,
  getIssues,
};
