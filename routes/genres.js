const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Genre = mongoose.model('Genre', genreSchema);

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
})

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send(`Genre with this ID doesn't exist`);

    res.send(genre);
})

router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    let genre = new Genre ({
        name: req.body.name
    });

    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, { new: true });
    if (!genre) return res.status(404).send(`Genre with this ID doesn't exist`);

    res.send(genre);
})

router.delete('/:id', async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send(`Genre with this ID doesn't exist`);

    res.send(genre);
})

function validateGenre(genre) {
    const genreSchema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return genreSchema.validate(genre);
}

module.exports = router;