const express = require("express");
const Router = express.Router();
const { live } = require("../controller/basicontroller");

// === === === live === === === //

Router.get("/", live);

// === === === final exports === === === //

module.exports = Router;
