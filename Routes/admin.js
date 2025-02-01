const express = require("express");
const {
  login,
  admin_profile,
  approve_image,
  de_list,
} = require("../controller/admincontroller");
const Router = express.Router();
const adminauth = require("../middleware/adminauth");
// === === === admin login === === === //

Router.post("/login", login);

// === === === admin profile === === === //

Router.get("/profile", adminauth, admin_profile);

// === === === admin approve image === === === //

Router.post("/approveimage", adminauth, approve_image);

// === === === de-list image === === === //

Router.post("/delistimage", adminauth, de_list);

module.exports = Router;
