//@baseRoute /api/contacts
//@access public

const asyncHandler = require('express-async-handler')
const MyContacts = require('../models/contactModels');
const { isValidObjectId } = require('mongoose');

const getContact = asyncHandler(async (req, res) => {
    const contacts = await MyContacts.find({user_id: req.user.id})
    res.status(200).json(contacts)
});

const getContactById = asyncHandler(async (req, res) => {
    if (isValidObjectId(req.params.id)) {
        const contact = await MyContacts.find({user_id: req.user.id, _id: req.params.id})
        if(!contact){
            res.status(404);
            throw new Error ('Contact not Found!')
        }
        res.status(200).json(contact)
    } else {
        res.status(403)
        throw new Error ('Not a valid ObjectId!')
    }
});

const createContact = asyncHandler(async (req, res) => {
    console.log('The request body is ', req.body)
    const {name, email, phone} = req.body
    if(!name || !email || !phone){
        res.status(400);
        throw new Error ('All fields are mandatory!')
    }
    const contact = await MyContacts.create({
        user_id: req.user.id,
        name,
        email,
        phone
    })
    res.status(200).json(contact)
});

const updateContact = asyncHandler(async (req, res) => {
    if (isValidObjectId(req.params.id)) {
        const contact = await MyContacts.findById(req.params.id)
        if(!contact){
            res.status(404);
            throw new Error ('Contact not Found!')
        }
        if(contact.user_id.toString() !== req.user.id){
            res.status(403)
            throw new Error ('you have no permission to update this contact')
        }
        const updatedContact = await MyContacts.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {new: true})
        res.status(200).json(updatedContact)
    } else {
        res.status(403)
        throw new Error ('Not a valid Id!')
    }
})

const deleteContact = asyncHandler(async (req, res) => {
    if (isValidObjectId(req.params.id)) {
        const contact = await MyContacts.findById(req.params.id)
        if(!contact){
            res.status(404);
            throw new Error ('Contact not Found!')
        }
        if(contact.user_id.toString() !== req.user.id){
            res.status(403)
            throw new Error ('you have no permission to update this contact')
        }
        await MyContacts.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "contact deleted successfully" })
    } else {
        res.status(403)
        throw new Error ('Not a valid Id!')
    }
});

module.exports = {
    getContact,
    getContactById,
    createContact,
    updateContact,
    deleteContact
}