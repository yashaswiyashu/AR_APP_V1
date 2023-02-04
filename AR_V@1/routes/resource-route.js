const express = require("express");
const resource = require("../models/resource-model");
const router = express.Router();

router.post("/resource", async (req, res) => {
  const Resource = new resource({
    VideoLocation: req.body.VideoLocation,
    PatternLocation: req.body.PatternLocation,
  });
  try {
    const savedResource = await Resource.save();
    res.json(savedResource);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/getallresource", async (req, res) => {
  try {
    const Resource = await resource.find();
    res.json(Resource);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
