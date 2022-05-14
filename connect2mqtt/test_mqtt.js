var mqtt = require('mqtt')
var jwt = require('jsonwebtoken')

var password = jwt.sign({
    username: "jwt-user",
    exp: Math.floor(Date.now() / 1000 ) + 10
}, "emqxsecret")

console.log(password)

var client = mqtt.connect('mqtt://127.0.0.1:1883', {
    username: "jwt-user",
    password: password
})

client.on('error', function(error) {
    console.error(error)
    // console.log('return code: ' + connack.returnCode)
    //client.end()
    console.log('error code:' + error.code)
    if (error.code === 5) {
        console.log(password)
    }
    client.end()
//     new client = mqtt.connect('mqtt://127.0.0.1:1883', {
//     username: "jwt-user",
//     password: password
// })
    password = jwt.sign({
        username: "jwt-user",
        exp: Math.floor(Date.now() / 1000 ) + 10
    }, "emqxsecret")

    client.reconnect('mqtt://127.0.0.1:1883', {
        username: "jwt-user",
        password: password
    })
})

client.on('connack', function(connack) {
    // console.error(error)
    console.log('return code: ' + connack.returnCode)
    client.end()
})

// client.on('connect', function(connack) {
//     // console.error(error)
//     console.log('return code: ' + connack.returnCode)
//     client.end()
// })

client.on('connect', function(connect) {
    // console.error(error)
    console.log('return code: ' + connect.returnCode)
    //client.end()
})