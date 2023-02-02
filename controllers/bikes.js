const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const returnAllBikes = async (req, res) => {
  try {
    const response = await mongodb
      .getDb()
      .db("steel_horses")
      .collection("mc_data")
      .find();
    response.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const findBikeById = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  if (!userId) {
    res.status(400);
    return;
  }
  try {
    const response = await mongodb
      .getDb()
        .db("steel_horses")
        .collection("mc_data")
      .find({ _id: userId });
    response.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const createBike = async (req, res) => {
  const bike = {
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    motor: req.body.motor,
    displacement: req.body.displacement,
    transmission: req.body.transmission,
    drive: req.body.drive,
    terrain: req.body.terrain
  };
  try {
    const response = await mongodb
      .getDb()
        .db("steel_horses")
        .collection("mc_data")
      .insertOne(bike);
    res.status(201).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
};

const updateBike = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const bike = {
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    motor: req.body.motor,
    displacement: req.body.displacement,
    transmission: req.body.transmission,
    drive: req.body.drive,
    terrain: req.body.terrain
  };
  try{
    const response = await mongodb
      .getDb()
        .db("steel_horses")
        .collection("mc_data")
      .replaceOne({ _id: userId }, bike);
    res.status(204).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
};

const deleteBike = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  if (!userId) {
    res.status(400);
    return;
  }
  try{
    const response = await mongodb
      .getDb()
        .db("steel_horses")
        .collection("mc_data")
      .deleteOne({ _id: userId }, true);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e)
  }
};

module.exports = { returnAllBikes, findBikeById, createBike, updateBike, deleteBike };
