var express = require('express');
var router = express.Router();

const {register, login, processRegister, processLogin} = require('../controllers/userController');
const {validateRegister, validateLogin} = require('../validations');

/* GET users listing. */
router
      .get('/register', register)
      .post('/register', validateRegister, processRegister)
      .get('/login', login)
      .post('/login', validateLogin, processLogin)
      

module.exports = router;
