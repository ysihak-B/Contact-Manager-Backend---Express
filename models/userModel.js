const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add the user name']
    },
    email: {
        type: String,
        required: [true, 'Please add the user email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add the user name']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)