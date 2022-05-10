const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('connected successfully'))
    .catch(err => console.err('Could not connect to db'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on ${port}`));