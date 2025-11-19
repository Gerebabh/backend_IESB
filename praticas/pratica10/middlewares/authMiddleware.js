const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
    const { authorization } = req.headers;

    try {
        if (!authorization) {
            return res.status(401).json({ msg: "Token invalido" });
        }

        const token = authorization.replace(/Bearer\s*/i, "").trim();

        if (!token) {
            return res.status(401).json({ msg: "Token invalido" });
        }

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.payload = {
            iss: payload.iss,
            aud: payload.aud,
            email: payload.email,
            nome: payload.nome,
        };

        req.usuario = payload.email;

        return next();

    } catch (err) {
        return res.status(401).json({ msg: "Token invalido" });
    }
}

function gerarToken(payload) {
    try {
        return jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: parseInt(process.env.JWT_EXPIRES) } 
        );
    } catch (err) {
        throw "Erro ao gerar token";
    }
}

function cifrarSenha(senha) {
    return senha;
}

function compararSenha(senhaDigitada, senhaBanco) {
    return senhaDigitada === senhaBanco;
}

module.exports = {
    verificarToken,
    gerarToken,
    cifrarSenha,
    compararSenha
};

