import express from "express";
import User from "../mongodb/models/user.js";

const router = express.Router();

// GET user by ID
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log("Fetching user with ID:", userId); // Log the userId

    const user = await User.findById(userId).select("-password");

    if (!user) {
      // console.log("User not found for ID:", userId); // Log if user is not found
      return res.status(404).json({ message: "User not found" });
    }

    // console.log("User found:", user); // Log the user data
    res.status(200).json(user);
  } catch (error) {
    // console.error("Error fetching user:", error.message); // Log the error
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/:userId/credits", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.credits < 1) {
      return res.status(400).json({ message: "Insufficient credits" });
    }

    user.credits -= 1;
    await user.save();

    res.status(200).json({ message: "Credits deducted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
