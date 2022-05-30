const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const UserModels = require ('../Models/UserModels.js')

let userModels = new UserModels();

exports.setAvatar = (req, res, next) => {
    let sql = 'UPDATE users SET avatar = ?';
    console.log(req.file);
    sql = mysql.format(sql, req.file.path);

    return new Promise((resolve, reject) => {
        connectdb.query(sql, function (err, result) {
            if (err) console.log(err);
            resolve({
                message: 'Avatar updated successfully',
            })
        })
    }).then(result => {
        res.status(200).json(result);
    })
};

exports.signup = (req, res, next) => {
    let email = req.body.email;
	let password = req.body.password;
	let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    bcrypt.hash(password, 10)
        .then (hash => {
            let sqlInserts = [lastName, firstName, email, hash];
            userModels.signup(sqlInserts)
                .then((response) =>{
                    res.status(201).json(JSON.stringify(response))
                })
                .catch((error) =>{
                    console.error(error);
                    res.status(400).json({error})
                })
        })
        .catch(error => res.status(500).json(error)) 
};

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let sqlInserts = [email];
    userModels.login(sqlInserts, password)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            res.status(400).json(error)
        })
}
exports.seeMyProfile = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    userModels.seeMyProfile(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(error)
        })
}   
exports.updateUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    // let avatar = req.body.avatar;
    let sqlInserts = [firstName, lastName, email, userId];
    userModels.updateUser(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            res.status(400).json(error)
        })
}
exports.modifyAvatar = (req, res, next) => {
    if (req.file) {
        let sql = `SELECT * FROM user WHERE id = ?`;
        connectdb.execute(sql, [req.params.id], function (err, result) {
            if (err) res.status(400).json({ err });
            if (!result[0]) res.status(400).json({ message: "No id matches in table" });
            else {
                // IF THE USER HAS AN IMAGE, DELETE IT FROM THE IMAGES/PROFILE FOLDER
                if (result[0].avatar != "http://localhost:3000/images/profile/avatar.png") {
                    const name = result[0].avatar.split('/images/profile/')[1];
                    fs.unlink(`images/profile/${name}`, () => {
                        if (err) console.log(err);
                        else console.log('Image modified!');
                    })
                }
                // RECOVER THE INFORMATION SENT BY THE FRONT 
                let image = (req.file) ? `${req.protocol}://${req.get('host')}/images/profile/${req.file.filename}` : "";
                console.log(image);
                // UPDATE LA DB
                let sql2 = `UPDATE user
                SET avatar = ?
                WHERE id = ?`;
                connectdb.execute(sql2, [image, req.params.id], function (err, result) {
                    if (err) throw err;
                    res.status(201).json({ message: `User photo udpated` });
                });
            }
        });
    }
};
exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    userModels.deleteUser(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(error)
        })
} 
