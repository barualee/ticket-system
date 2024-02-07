const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add name']
        },
        email: {
            type: String,
            required: [true, 'Please add email']
        },
        password: {
            type: String,
            required: [true, 'Please add password']
        },
        isAdmin: {
            type: Boolean,
            required:true,
            default:false
        }
    },
    {
        timestamps: true 
    }
)

module.exports = mongoose.model('User', userSchema)