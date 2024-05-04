const express = require('express');
const router = express.Router();
const {listaUser, addUser} = require('../controllers/userController')

router.get("/", listaUser)
router.post("/", addUser)


module.exports = router;