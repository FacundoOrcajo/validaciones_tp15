const {loadUsers, storeUsers} = require('../data/userModule');
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');

module.exports = {
    register : (req, res) => {
        return res.render('register')
    },
    processRegister : (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            const {firstname, lastname, email, password} = req.body;
            const users = loadUsers();
            const newUser = {
                id : (users[users.length -1].id) + 1,
                firstname : firstname.trim(),
                lastname : lastname.trim(),
                email : email.trim(),
                password : bcryptjs.hashSync(password,12)
            }
            const usersModify = [...users, newUser];
            storeUsers(usersModify);
            return res.redirect('/users/login')
        }else{
            return res.render('register', {
                errors : errors.mapped(),
                old : req.body
            })
        }
    },
    login : (req, res) => {
        return res.render('login')
    },
    processLogin : (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            return res.redirect('/')
        }else{
            return res.render('login', {
                errors : errors.mapped()
            })
        }
    }
}