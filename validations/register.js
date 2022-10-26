const {check, body} = require('express-validator');
const users = require('../data/userModule').loadUsers();

module.exports = [
    ckeck('firstname')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isLength({min : 3}).withMessage('El nombre debe tener al menos 4 caracteres'),
    check('lastname')
        .notEmpty().withMessage('Debes completar el apellido').bail()
        .isLength({min : 3}).withMessage('El apellido debe tener al menos 4 caracteres'), 
    body('email')
        .notEmpty().withMessage('Obligatorio').bail()
        .custom((value, {req}) => {
            let user = users.find(user => user.email === value.trim());
            if(!user){
                return false
            }else{
                return true
            }
        }).withMessage('Contraseña inválida'),    
    check('password')
       .notEmpty().withMessage('Debes completar la contraseña').bail()
       .isLength({min : 3}).withMessage('La contraseña debe tener al menos 8 caracteres'),    
    body('password')
        .notEmpty().withMessage('Obligatorio').bail()
        .custom((value, {req}) => {
            if(value !== req.body.password){
                return false
            }else{
                return true
            }
        }).withMessage('Contraseña inválida')    
]