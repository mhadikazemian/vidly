const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    isGold: {type: Boolean, default: false},
    name: {type: String, required: true},
    phone: {type: String, required: true}
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const customerSchema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().min(5).required(),
        phone: Joi.string().min(5).required()
    });

    return customerSchema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
