const express = require('express');
const bird = require('./birds.js')

const app = express();

app.use('/', bird)

app.listen(3333)