const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
    const { authorization } = req.headers;
    try {
        const payload = jwt.verify(
            authorization,
            process.env.JWT_SECURE_KEY
        );
        req.payload = payload;
        return next();
    } catch (err) {
        res.status(401).json ({msg: "Token Invalido"})
    }
}

function gerarToken(payload) {
    try {
        const token = jwt.sign(
            payload,
            process.env.JWT_SECURE_KEY
        );
        return token;
    } catch(err) {
        throw Error("Erro ao gerar token");
    }
}

module.exports = {verificarToken, gerarToken}