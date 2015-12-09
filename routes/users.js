var express = require('express');
var router = express.Router();
console.log("       ROUTES/USERS.JS")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
