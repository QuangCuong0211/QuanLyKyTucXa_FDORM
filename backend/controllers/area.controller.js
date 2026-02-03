const areas = require("../src/data/areas");

exports.getAllAreas = (req, res) => {
  res.json(areas);
};

exports.createArea = (req, res) => {
  const newArea = {
    id: Date.now(),
    ...req.body
  };
  areas.push(newArea);
  res.status(201).json(newArea);
};
