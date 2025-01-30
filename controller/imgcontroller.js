const fs = require("fs");
const path = require("path");
const Busboy = require("busboy");
const uniqid = require("uniqid");
const { handleError } = require("../snippets/error");
const { fileupload } = require("../snippets/validation");
const image = require("../database/Schema/image");

exports.upload = async (req, res) => {
  try {
    const user = req.user;
    const busboy = Busboy({ headers: req.headers });
    const uploadDir = path.join(__dirname, "../public/");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    let fields = {};
    let uploadPath;
    let fileCount = 0;
    let savedFileName;
    let uploadRejected = false;

    busboy.on("field", (fieldname, value) => {
      fields = JSON.parse(value);
    });

    busboy.on("file", (fieldname, file, fileInfo) => {
      fileCount++;

      if (fileCount > 1) {
        uploadRejected = true;
        return handleError("Only one file is allowed.", 400);
      }

      const allowedMimeTypes = ["image/jpeg", "image/png"];
      if (!allowedMimeTypes.includes(fileInfo.mimeType)) {
        uploadRejected = true;
        return handleError("Only JPG and PNG files are allowed.", 400);
      }

      savedFileName = uniqid("img-") + `.${fileInfo.mimeType.split("/")[1]}`;
      uploadPath = path.join(uploadDir, savedFileName);
      const writeStream = fs.createWriteStream(uploadPath);

      file.pipe(writeStream);

      writeStream.on("finish", () => {
        console.log("File successfully saved:", uploadPath);
      });

      writeStream.on("error", (err) => {
        console.error("File write error:", err);
        uploadRejected = true;
        return handleError("File upload failed.", 500);
      });
    });

    busboy.on("finish", async () => {
      if (uploadRejected || fileCount > 1) {
        if (savedFileName) {
          fs.unlinkSync(path.join(uploadDir, savedFileName));
        }
        return res
          .status(400)
          .json({ result: false, message: "Only one file is allowed." });
      }

      if (!savedFileName) {
        return res
          .status(400)
          .json({ result: false, message: "No valid image file uploaded." });
      }
      let validate = fileupload(fields);
      if (!validate.result) {
        fs.unlinkSync(path.join(uploadDir, savedFileName));
        return res
          .status(validate.status)
          .json({ result: false, message: validate.message });
      }
      let img = new image({
        ...fields,
        imageUrl: savedFileName,
        user: user._id,
      });
      await img.save();
      return res.status(201).json({
        result: true,
        message:
          "Your file has been successfully uploaded. Please wait while we review and approve your image.",
        filePath: savedFileName,
      });
    });
    busboy.on("error", (error) => {
      console.error("Error during upload:", error);
      return handleError("File upload failed.", 500);
    });

    req.pipe(busboy);
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ result: false, message: error.message });
  }
};
