const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [{
    id: 1,
    name: 'Thriller'
}, {
    id: 2,
    name: 'Action'
}, {
    id: 3,
    name: 'Drama'
}, {
    id: 4,
    name: 'Comedy'
}];

const port = process.env.PORT || 3000;

app.get('/api/genres', (req, res) => {
    res.send(genres);
})

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`Course with this ID doesn't exist`);

    res.send(genre);
})

app.post('/api/genres', (req, res) => {
    const {
        error
    } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    const genre = {
        id: ++genres.length,
        name: req.body.name
    }

    genres.push(genre);

    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {

    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`Course with this ID doesn't exist`);

    const {
        error
    } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    genre.name = req.body.name;

    res.send(genre);
})

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`Course with this ID doesn't exist`);

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
})

function validateGenre(genre) {
    const genreSchema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return genreSchema.validate(genre);
}


app.listen(port, () => console.log(`listening on ${port}`));