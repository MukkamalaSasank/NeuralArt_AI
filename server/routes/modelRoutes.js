import express from "express";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello from Hugging Face");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const stabilityaiApiKey = process.env.STABILITY_AI_TOKEN;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0", 
      {
        headers: {
          Authorization: `Bearer ${stabilityaiApiKey}`,
          "Content-Type": "application/json", 
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData.error.message });
    }

    const blob = await response.blob();
    const imageData = await blob.arrayBuffer();
    const base64Image = Buffer.from(imageData).toString("base64");

    res.status(200).json({ photo: base64Image });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "An error occurred while generating the image." });
  }
});

export default router;

