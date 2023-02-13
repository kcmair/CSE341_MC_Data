const ObjectId = require("mongodb").ObjectId;
const Bike = require("../models/bikes")

const returnAllBikes = async (req, res) => {
  try {
    Bike.find(function (err, allBikes) {
      if (err) {
        res.status(500).json({message: err});
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(allBikes);
    });
  } catch (err) {
    res.status(500).json(err);
  }

};

const findBikeById = async (req, res) => {
  if (!ObjectId.isValid(req.params)) {
    res.status(400).json("Must use a valid Motorcycle ID.")
  }

  const bikeId = new ObjectId(req.params.id);
  try {
    Bike.findById(bikeId, function (err, bike) {
      if (err) {
        res.status(500).json({message: err});
      }
      if (bike) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(bike);
      } else {
        res.status(400).json(`Unable to find motorcycle with ID ${bikeId}`)
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createBike = async (req, res) => {
  const bike = new Bike ({
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    motor: req.body.motor,
    displacement: req.body.displacement,
    transmission: req.body.transmission,
    drive: req.body.drive,
    terrain: req.body.terrain
  });
  try {
    await bike.save(function (err, result) {
      if (err) {
        res(500).json(err);
      }
      res.status(201).json(`New Motorcycle ID: ${result._id}`);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateBike = async (req, res) => {
  if (!ObjectId.isValid(req.params)) {
    res.status(400).json("Must use a valid Motorcycle ID.")
  }
  const bikeId = new ObjectId(req.params.id);
  try {
    const response = await Bike.findOneAndUpdate(bikeId, req.body, {new: true});
    res.status(200).json(response);
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400).json(err.message);
    }
    res.status(500).json(err);
  }
};

const deleteBike = async (req, res) => {
  console.log("deleteBike")
  if (!ObjectId.isValid(req.params)) {
    res.status(400).json("Must use a valid Motorcycle ID.")
  }
  const bikeId = new ObjectId(req.params.id);
  try {
    Bike.deleteOne({ _id: bikeId }, function (err, response) {
      if (err) {
        console.log("Error1")
        res(500).json(err);
      }
      if (response.deletedCount > 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json(response.error || `Unable to find motorcycle with ID ${bikeId}`)
      }
    });
  } catch (err) {
    res.status(500).json(err)
  }
};

module.exports = {returnAllBikes, findBikeById, createBike, updateBike, deleteBike};
