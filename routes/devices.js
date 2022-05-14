var express = require('express');
var shortid = require('shortid');
const Device = require('../models/device');

var router = express.Router();

router.post("/", function(req, res){
    var productName = req.body.product_name
    var deviceName = shortid.generate()
    var Secret = shortid.generate()
    var userName = productName + "/" + deviceName

    var device = new Device({
        product_name: productName,
        device_name: deviceName,
        secret: Secret,
        username: userName
    })

    device.save(function(err) {
        if(err) {
            res.status(500).send(err)
        } else {
            res.json({product_name: productName, device_name: deviceName, secret:Secret})
        }
    })
})

router.get("/:product_name/:device_name", function(req, res){
    var productName = req.params.product_name
    var deviceName = req.params.device_name

    Device.findOne({"product_name": productName, "device_name": deviceName}, function(err, device){
        if(err) {
            res.send(err)
        } else {
            if(device != null){
                res.json(device.toJSONObject())
            } else {
                res.status(404).json({error: 'Not Found'})
            }
        }
    })
})

router.get("/:product_name", function(req, res) {
    var productName = req.params.product_name
    Device.find({product_name: productName}, function(err, device) {
        if(err) {
            res.send(err)
        } else {
            if (device != null){
                res.json(device.map(function (device) {
                    return device.toJSONObject()
                }))
            }
        }
    })
})

module.exports = router;