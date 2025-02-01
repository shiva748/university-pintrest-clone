const { handleError } = require("../snippets/error");
const Admin = require("../database/Schema/admin");
let Image = require("../database/Schema/image");
const { login } = require("../snippets/validation");

// === === === admin login === === === //

exports.login = async (req, res) => {
  try {
    login(req.body);
    let { email, username, password } = req.body;
    let admin = await Admin.findOne(
      {
        $or: [email ? { email: email.toLowerCase() } : { username }],
      },
      { createdAt: 0, updatedAt: 0 }
    );
    if (admin) {
      if (admin.comparePassword(password)) {
        let token = await admin.genrateauth(admin);
        res
          .status(200)
          .cookie("admin_auth_tkn", token, {
            expires: new Date(Date.now() + 86400000),
            httpOnly: true,
          })
          .json({
            success: true,
            message: "Login successful",
            data: {
              email: admin.email,
              username: admin.username,
              role: admin.role,
              Permissions: admin.permissions,
            },
          });
      } else {
        handleError("Invalid credentials", 400);
      }
    } else {
      handleError("Invalid credentials", 400);
    }
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ result: false, message: error.message });
  }
};

// === === == admin profile === === === //

exports.admin_profile = async (req, res) => {
  try {
    let admin = req.admin;
    return res.status(200).json({ result: true, data: admin._doc });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ result: false, message: error.message });
  }
};

// === === === approve image === === === //

exports.approve_image = async (req, res) => {
  try {
    const admin = req.admin;
    let { image_id } = req.body;
    if (!image_id || !admin.permissions.includes("write")) {
      handleError("Invalid request", 400);
    }
    let result = await Image.updateOne({ _id: image_id }, { approved: true });
    return res
      .status(200)
      .json({ result: true, message: "Image approved successfully" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ result: false, message: error.message });
  }
};

// === === === de-list image === === === //

exports.de_list = async (req, res) => {
  try {
    const admin = req.admin;
    let { image_id } = req.body;
    if (!image_id || !admin.permissions.includes("write")) {
      handleError("Invalid request", 400);
    }
    let result = await Image.updateOne({ _id: image_id }, { approved: false });
    return res
      .status(200)
      .json({ result: true, message: "Image de-listed successfully" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ result: false, message: error.message });
  }
};
