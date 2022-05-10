const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const genreSchema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return genreSchema.validate(genre);
}


exports.Genre = Genre;
exports.validate = validateGenre;