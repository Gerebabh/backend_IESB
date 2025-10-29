var express = require('express');
const auth = require('../middlewares/auth');
var router = express.Router();

router.get('/', auth.verificarToken, function(req, res, next) {
  res.json("API esta ON")
});

module.exports = router;
