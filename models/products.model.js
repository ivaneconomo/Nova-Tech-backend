const { Schema, model } = require("mongoose");

const productsSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: Array,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  offert:{
    type: Boolean,
    required: true,
    default: false
  },
  quantity:{
    type: Number,
    required: true
  }
});

module.exports = model("products", productsSchema);
