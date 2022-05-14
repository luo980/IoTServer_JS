var express = require('express');
var shortid = require('shortid');
var jwt = require('jsonwebtoken');
const res = require('express/lib/response');

var router = express.Router();

const jwtSecret = 'emqxsecret'

router.post('/', function(_, res){
    var username = shortid.generate()
    var password = jwt.sign({
        username: username,
        exp: Math.floor(Date.now() / 1000) + 20}, jwtSecret)
    res.json({username: username, password: password})
})

module.exports = router;