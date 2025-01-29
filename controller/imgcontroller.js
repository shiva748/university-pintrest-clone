const fs = require("fs");
const path = require("path");
const Busboy = require("busboy");
const uniqid = require("uniqid");

exports.upload = (req, res) => {
  try {
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

    busboy.on("file", (fieldname, file, fileInfo) => {
      fileCount++;

      if (fileCount > 1) {
        console.error("Multiple file upload detected. Rejecting request.");
        uploadRejected = true;
        if (savedFileName) {
          fs.unlinkSync(path.join(uploadDir, savedFileName));
        }
        return res.status(400).json({ message: "Only one file is allowed." });
      }

      const allowedMimeTypes = ["image/jpeg", "image/png"];
      if (!allowedMimeTypes.includes(fileInfo.mimeType)) {
        console.error("Invalid file type:", fileInfo.mimeType);
        uploadRejected = true;
        return res
          .status(400)
          .json({ message: "Only JPG and PNG files are allowed." });
      }

      savedFileName = uniqid("img-") + `.${fileInfo.mimeType.split("/")[1]}`;
      uploadPath = path.join(uploadDir, savedFileName);
      const writeStream = fs.createWriteStream(uploadPath);
      file.pipe(writeStream);

      file.on("error", (err) => {
        console.error("File upload error:", err);
        uploadRejected = true;
        return res.status(500).json({ message: "File upload failed." });
      });
    });

    busboy.on("field", (fieldname, value) => {
      fields[fieldname] = value;
    });

    busboy.on("finish", () => {
      if (uploadRejected || fileCount > 1) {
        if (savedFileName) {
          fs.unlinkSync(path.join(uploadDir, savedFileName));
        }
        return res.status(400).json({ message: "Only one file is allowed." });
      }

      if (!savedFileName) {
        return res
          .status(400)
          .json({ message: "No valid image file uploaded." });
      }

      res.status(200).json({
        message: "File uploaded successfully!",
        filePath: uploadPath,
        fields,
      });
    });

    busboy.on("error", (error) => {
      console.error("Error during upload:", error);
      res.status(500).json({ message: "File upload failed." });
    });

    req.pipe(busboy);
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ result: false, message: error.message });
  }
};
