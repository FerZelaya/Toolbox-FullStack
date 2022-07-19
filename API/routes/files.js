var express = require("express");
var router = express.Router();
const axios = require("axios");

/* GET users listing. */
router.get("/data", function (req, res, next) {
  axios
    .get("https://echo-serv.tbxnet.com/v1/secret/files", {
      headers: {
        Authorization: `Bearer aSuperSecretKey`,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
