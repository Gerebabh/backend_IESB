var express = require('express');

const auth = require("../middlewares/auth");

var router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // simula autenticacao
  if (username === "geraldo.lucio@iesb.edu.br" && password === "abcd1234"){
    const payload = {
      email: username,
      nome: "Geraldo"
    }
    try {
      return res.json({ token: auth.gerarToken(payload) })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
  return res.status(401).json({ msg: "Credenciais invalidas" });
});

module.exports = router;
