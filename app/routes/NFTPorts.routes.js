module.exports = app => {
  const nftports = require("../controllers/NFTPorts.controller.js");

  var router = require("express").Router();

  router.get("/", nftports.getAll);

  router.get("/details/:address/:nftId", nftports.details);

  router.get("/contracts/:address", nftports.contracts);

  router.get("/account/:account", nftports.account);

  app.use('/v1/nftports', router);
};