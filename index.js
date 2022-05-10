const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('connected successfully'))
    .catch(err => console.err('Could not connect to db'));

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on ${port}`));