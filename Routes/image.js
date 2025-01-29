const express = require("express");
const Router = express.Router();
const verify = require("../middleware/authenticate");
const { upload } = require("../controller/imgcontroller");

// === === === upload image === === === //

Router.post("/upload", verify, upload);

// === === === final exports === === === //

module.exports = Router;
