const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');



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
    const { error } = validate(req.body);
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
    
    const { error } = validate(req.body);
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

module.exports = router;