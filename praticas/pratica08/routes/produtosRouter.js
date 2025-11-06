const express = require('express'); 
const authMiddleware = require('../middlewares/authMiddleware'); 
const router = express.Router(); 

router.get('/', authMiddleware.verificarToken, (req,res) => { 
    res.json(" DEU BOM ")
}); 

module.exports = router 