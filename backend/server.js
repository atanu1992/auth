const express = require('express');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
const cors = require('cors');
const api = require('./routes/api');
const PORT = 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api',api);


app.listen(PORT, function() {
    console.log('Server is running on port - '+PORT);
});