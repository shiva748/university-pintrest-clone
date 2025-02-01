// https://ui.shadcn.com/

// === === === imports === === === //\
require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3001;
const basic = require("./Routes/basic");
const auth = require("./Routes/authentication");
const image = require("./Routes/image");
const admin = require("./Routes/admin");
const cookieParser = require("cookie-parser");
// === === === initialization === === === //

const app = express();

require("./database/connection");

// === === === injecting middleware === === === //

app.use(express.json());

app.use(cookieParser());

// === === === serving files === === === //

app.use("/image", express.static("./public"));

// === === === use of routes === === === //

app.use("/", basic);

app.use("/auth", auth);

app.use("/image", image);

app.use("/admin", admin);

// === server final listen === === //

app.listen(PORT, (err) => {
  console.log(err ? `some error occured` : `listining to port ${PORT}`);
});
