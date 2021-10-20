module.exports = app => {
  // const Tutorial = require("../controllers/tutorial.controller.js");
  const nft = require("../controllers/nft.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", nft.create);

  // Retrieve all Tutorials
  router.get("/", nft.findAll);

  // Retrieve all published Tutorials
  router.get("/lending", nft.findAllLending);

  // Retrieve a single Tutorial with id
  router.get("/:nftId", nft.findOne);

  // Update a Tutorial with id
  router.put("/:nftId", nft.update);

  // Delete a Tutorial with id
  router.delete("/:nftId", nft.delete);

  // Delete all Tutorials
  router.delete("/", nft.deleteAll);

  app.use('/v1/nft', router);
};