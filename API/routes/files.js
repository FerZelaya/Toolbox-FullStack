var express = require("express");
var router = express.Router();
const {
  getFiles,
  downloadFiles,
  formatResponse,
} = require("../services/files.services");

/* GET files */
router.get("/data", async function (req, res, next) {
  const allFiles = await getFiles();
  const downloadedFiles = await downloadFiles(allFiles);
  const formatFiles = [];
  for (var i = 0; i < downloadedFiles.length; i++) {
    formatFiles.push(formatResponse(downloadedFiles[i]));
  }
  const results = formatFiles.filter((element) => {
    if (Object.keys(element).length !== 0) {
      return true;
    }

    return false;
  });
  res.send(results);
});

module.exports = router;
