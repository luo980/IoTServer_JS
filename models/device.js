var mongoose = require('mongoose')
Schema = mongoose.Schema

const deviceSchema = new Schema({
    //ProductName
    product_name: {
        type: String,
        required: true
    },

    //DeviceName
    device_name: {
        type: String,
        required: true
    },

    //EMQX username
    username: {
        type: String,
        required: true
    },

    //Secret
    secret: {
        type: String,
        required: true
    }
})

deviceSchema.methods.toJSONObject = function(){
    return {
        product_name: this.product_name,
        device_name: this.device_name,
        secret: this.secret
    }
}

var Device = mongoose.model('Device', deviceSchema)
module.exports = Device