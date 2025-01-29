const { handleError } = require("../snippets/error");

exports.live = (req, res) => {
  res.status(200).json({ message: "we are live" });
};
