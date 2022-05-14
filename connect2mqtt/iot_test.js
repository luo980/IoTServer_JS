const IoTDevice = require("./iot_device");

var device = new IoTDevice({
    productName: "raspberrypi4",
    deviceName: "jGPS-cnSc",
    secret: "av6auHID2t"
})

device.on('online', function(){
    console.log('device is online');
    // device.disconnect();
})

device.on('offline', function(){
    console.log('device is offline');
})

device.on('error', function(){
    console.log('connect error')
})

device.connect()