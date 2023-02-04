const express = require("express");
const userData = require("../models/user-data-model");
const router = express.Router();

router.post("/userData", async (req, res) => {
  const UserData = new userData({
    IP: req.body.IP,
    Country: req.body.Country,
    Region: req.body.Region,
    City: req.body.City,
    Latitude: req.body.Latitude,
    Longitude: req.body.Longitude,
  });
  try {
    const savedUserData = await UserData.save();
    res.json(savedUserData);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router