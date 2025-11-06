const express = require('express'); 
const authMiddleware = require('../middlewares/authMiddleware'); 
const router = express.Router(); 

router.post('/login', (req,res) => { 
    const email = req.body.email
    const token = authMiddleware.gerarToken(email); 
    return res.status(200).json({token: `${token}`}); 
}); 

router.post('/renovar', authMiddleware.verificarToken, (req,res) => { 
    const email = req.usuario.email; 
    const novoToken = authMiddleware.gerarToken(email)
    return res.status(200).json({token: `${novoToken}`}); 
}); 

module.exports = router ;