const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, 'Please add the contat name']
    },
    email: {
        type: String,
        required: [true, 'Please add the contat email address']
    },
    phone: {
        type: String,
        required: [true, 'Please add the contat phone number']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("MyContacts", contactSchema)