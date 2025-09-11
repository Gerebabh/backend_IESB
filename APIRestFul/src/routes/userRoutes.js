const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD de Users
router.post('/users', userController.createUser);       // Create
router.get('/users', userController.getAllUsers);       // Read all
router.get('/users/:id', userController.getUserById);   // Read by ID
router.put('/users/:id', userController.updateUser);    // Update
router.delete('/users/:id', userController.deleteUser); // Delete

module.exports = router;
