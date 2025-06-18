const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel"); // You’ll create this model below

// Save contact form data
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: "Message saved successfully" });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ message: "Failed to save message" });
  }
});

module.exports = router;
