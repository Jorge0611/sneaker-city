const brand = require("./brand.json");
const sneakers = require("./sneakers.json");
const sizes = require("./sizes.json");
const tamano = require("./tamano.json");

module.exports = () => ({
  brand: brand,
  sneakers: sneakers,
  sizes: sizes,
  tamano: tamano,
});
