
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multerUser = require('../middleware/multerUser');

const userCtrl = require('../controllers/user');

try{
    router.post('/signup', multerUser, userCtrl.signup);
    router.post('/login', userCtrl.login);
    router.get('/', auth, userCtrl.seeMyProfile);
    router.delete('/', auth, userCtrl.deleteUser);
    router.put('/', auth, userCtrl.updateUser);
    router.put('/', auth,multerUser, userCtrl.modifyAvatar);
}catch (error){
    console.log(error);
}

module.exports = router;