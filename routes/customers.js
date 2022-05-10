const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();

const customerSchema = new mongoose.Schema({
    isGold: {type: Boolean, default: false},
    name: {type: String, required: true},
    phone: {type: String, required: true}
});

const Customer = mongoose.model('Customer', customerSchema);

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send(`Customer with this ID doesn't exist`);

    res.send(customer);
})

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.message);

    let customer = new Customer ({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });

    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, 
        {
            isGold: req.body.isGold, 
            name: req.body.name, 
            phone: req.body.phone
        },
        { new: true });

    if (!customer) return res.status(404).send(`Customer with this ID doesn't exist`);

    res.send(customer);
})

router.delete('/:id', async (req, res) => {

    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send(`Customer with this ID doesn't exist`);

    res.send(customer);
})

function validateCustomer(customer) {
    const customerSchema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().min(5).required(),
        phone: Joi.string().min(5).required()
    });

    return customerSchema.validate(customer);
}

module.exports = router;