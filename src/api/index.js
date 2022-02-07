const brand = require("./brand.json");
const sneakers = require("./sneakers.json");
const sizes = require("./sizes.json");

module.exports = () => ({
  brand: brand,
  sneakers: sneakers,
  sizes: sizes,
});
