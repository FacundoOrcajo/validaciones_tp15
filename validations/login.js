const { check, body } = require("express-validator");
const users = require('../data/userModule').loadUsers();
const bcryptjs = require('./validateLogin');

module.exports = [
    check('email')
        .notEmpty().withMessage('Obligatorio').bail()
        .isEmail().withMessage('Email incorrecto'),
    body('password')
        .notEmpty().withMessage('Obligatorio').bail()
        .custom((value, {req}) => {
            let user = users.find(user => user.email === req.body.email.trim() && bcryptjs.compareSync(value, user.password));
            if(!user){
                return false
            }else{
                return true
            }
        }).withMessage('Contraseña inválida')    
]
