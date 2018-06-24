var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  var reqUrl = req.query.reqUrl;
  axios.get(reqUrl)
  .then(function(response) {
    var data = JSON.stringify(response.data);
    res.status(200).send(data);
  }).catch(function(error) {
    var responseCode = Number(error.response.status);
    var responseText = error.response.statusText;
    res.status(responseCode).send(responseText);
  })
})

module.exports = router;