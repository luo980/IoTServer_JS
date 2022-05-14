"use strict";
var mqtt = require("mqtt");
const EventEmitter = require('events')

class IoTDevice extends EventEmitter {
    constructor({serverAddress = "127.0.0.1:1883", productName, deviceName, secret} = {}) {
        super();
        this.serverAddress = 'mqtt://'+serverAddress;
        this.productName = productName;
        this.deviceName = deviceName;
        this.secret = secret;
        this.username = productName + '/' + deviceName;
    }

    connect() {
        console.log(this.serverAddress)
        console.log(this.username)
        console.log(this.secret)
        this.client = mqtt.connect(this.serverAddress, {
            rejectUnauthorized: true,
            username: this.username,
            password: this.secret
        })

        var self = this;
        
        this.client.on('connect', function(){
            self.emit('online')
        })

        this.client.on('offline', function(){
            self.emit('offline')
        })

        this.client.on('error', function(error){
            console.error(error)
            self.emit('error')
        })
    }

    disconnect() {
        if (this.client != null){
            this.client.end()
        }
    }
}

module.exports = IoTDevice