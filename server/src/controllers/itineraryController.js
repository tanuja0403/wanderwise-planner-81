const Itinerary = require("../models/Itinerary");
const fetch = require("node-fetch");

exports.list = async (req, res) => {
  const items = await Itinerary.find({ user: req.user.id }).sort({ updatedAt: -1 });
  res.json(items);
};

exports.create = async (req, res) => {
  const payload = { ...req.body, user: req.user.id };
  const item = await Itinerary.create(payload);
  res.status(201).json(item);
};

exports.getOne = async (req, res) => {
  const item = await Itinerary.findOne({ _id: req.params.id, user: req.user.id });
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

exports.update = async (req, res) => {
  const item = await Itinerary.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

exports.remove = async (req, res) => {
  const item = await Itinerary.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json({ success: true });
};

// Generate itinerary using Hugging Face API
exports.generateItinerary = async (req, res) => {
  try {
    const { destination, days } = req.body;

    if (!destination || !days) {
      return res.status(400).json({ error: "Destination and days are required" });
    }

    const prompt = `Create a detailed ${days}-day itinerary for ${destination}. Include:
- Morning, afternoon, and evening plans for each day
- Food recommendations and local restaurants
- Where to stay and accommodation suggestions
- Local travel routes and transportation tips
- Hidden gems and must-visit attractions
- Budget tips and money-saving advice
- Local culture and customs to know
Please format the itinerary clearly with sections for each day.`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/rahmanazhar/Travereel-Model-V1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_length: 1000 },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Hugging Face API error:", errorData);
      return res.status(response.status).json({ 
        error: "Failed to generate itinerary from Hugging Face API",
        details: errorData 
      });
    }

    const result = await response.json();
    const text = result[0]?.generated_text || "No output. Please try again.";

    return res.json({ itinerary: text });
  } catch (err) {
    console.error("Error generating itinerary:", err);
    res.status(500).json({ error: "Failed to generate itinerary", details: err.message });
  }
};

