const express   = require('express');
const router    = express.Router();
var mysql       = require('mysql');
const jwt       = require('jsonwebtoken');
const checkAuth = require('../middleware/checkauth');
var connection  = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'volvo'
});


connection.connect(function(err){
    if(!err) {
        console.log("Connected to mysql database "+connection.threadId);  
    } else {
        console.log("Error connecting mysql database "+err);  
    }
});

router.post('/login', (req,res) => {
    let postData = req.body;
    if(!postData.email || !postData.password) {
        res.status(404).json({success: 'false', message: 'email and password both are required'});
    }else {
        var query = connection.query('SELECT * FROM userdetails WHERE `email` = ?', [postData.email], function (error, results, fields) {
            if (error) {
                res.status(404).json({success: 'false', message: 'Email not found'});
            }else{
                let password;let email;
                for (var i in results) {
                    password = results[i].password;
                    email = results[i].email;
                }            
                if(postData.password != password) {
                    res.status(404).json({success: 'false', message: 'password not match'});
                }else{
                    const token = jwt.sign({email:email, password:password}, "secret_key", {expiresIn : "1h"});
                    res.status(200).json({success: 'true', message: token});
                }   
            } 
          });
    }
}); 

router.post('/register',(req,res) => {
    let postData = req.body;
    if(!postData.email || !postData.password) {
        res.status(200).json({success: 'false', message: 'email and password both are required'});
    }else {
        var query = connection.query('INSERT INTO userdetails SET ?', postData, function (error, results, fields) {
            if (error) {
                res.status(200).json({success: 'false', message: error});
            }else {
                res.status(200).json({success: 'true', message: results});
            } 
          });
    }
}); 

router.get('/viewAllData', checkAuth, (req, res) => {
    let query = connection.query('SELECT * FROM userdetails', function (error, results, fields) {
        if (error) {
            res.status(200).json({success: 'false', message: error});
        }else{
            res.status(200).json({success: 'true', message: results});
        } 
      });
});



module.exports = router;