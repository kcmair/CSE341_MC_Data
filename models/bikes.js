const mongoose = require("mongoose");

const BikeSchema = new mongoose.Schema({
  make: {
    type: "string",
    required: true,
  },

  model: {
    type: "string",
    required: true
  },

  year: {
    type: "number",
    required: true,
  },

  motor: {
    type: "string"
  },

  displacement: {
    type: "string"
  },

  transmission: {
    type: "string"
  },

  drive: {
    type: "string"
  },

  terrain: {
    type: "string",
    required: true
  }
}, { collection: "mc_data" });

BikeSchema.statics = {
  valueExists(query) {
    return this.findOne(query).then(result => result);
  }
};

module.exports = mongoose.model("Bike", BikeSchema);
