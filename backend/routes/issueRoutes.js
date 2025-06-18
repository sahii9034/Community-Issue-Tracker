const express = require("express");
const router = express.Router();
const Issue = require("../models/issueModel");

// ✅ Create a New Issue
router.post("/", async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (err) {
    console.error("Error creating issue:", err);
    res.status(500).json({ message: "Error creating issue" });
  }
});

// ✅ Get All Issues
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
  } catch (err) {
    console.error("Error fetching issues:", err);
    res.status(500).json({ message: "Error fetching issues" });
  }
});

// ✅ Update Issue Status by ID
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedIssue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.status(200).json(updatedIssue);
  } catch (error) {
    console.error("Error updating issue status:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
});

module.exports = router;
