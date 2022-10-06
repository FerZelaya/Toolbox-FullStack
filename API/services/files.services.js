const axios = require("axios");
const Papa = require("papaparse");

module.exports = class {
  static async getFiles() {
    try {
      const files = axios
        .get("https://echo-serv.tbxnet.com/v1/secret/files", {
          headers: {
            Authorization: `Bearer aSuperSecretKey`,
          },
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        });

      return files;
    } catch (error) {
      return error;
    }
  }

  static formatResponse(file) {
    const formattedResponse = new Object({});
    const lines = new Object({});

    for (var i = 1; i < file.length; i++) {
      if (file[i].length === 4 && Array.isArray(file[i])) {
        formattedResponse["file"] =
          Array.isArray(file[i]) && file[i].slice(0, 1).shift();

        lines["text"] = Array.isArray(file[i]) && file[i].slice(1, 2).shift();
        lines["number"] = Array.isArray(file[i]) && file[i].slice(2, 3).shift();
        lines["hex"] = Array.isArray(file[i]) && file[i].slice(3, 4).shift();

        formattedResponse["lines"]
          ? formattedResponse["lines"].push(lines)
          : (formattedResponse["lines"] = [lines]);
      }
    }

    return formattedResponse;
  }

  static async downloadFiles(allFiles) {
    const downloadedFiles = [];

    for (var i = 0; i < allFiles.files.length; i++) {
      try {
        const url = `https://echo-serv.tbxnet.com/v1/secret/file/${allFiles.files[i]}`;

        const response = await axios
          .get(url, {
            headers: {
              Authorization: `Bearer aSuperSecretKey`,
            },
          })
          .then((response) => response.data);

        const results = await Papa.parse(response, {
          delimiter: "",
          skipEmptyLines: "greedy",
          headers: true,
        });

        downloadedFiles.push(results.data);
      } catch (error) {
        continue;
      }
    }

    return downloadedFiles;
  }
};
