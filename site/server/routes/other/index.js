const express = require("express");
const router = express.Router();

const getLinks = require("./get_links");
router.use("/get_links", getLinks);

const getCorrelations = require("./get_correlations");
router.use("/get_correlations", getCorrelations);

module.exports = router;
