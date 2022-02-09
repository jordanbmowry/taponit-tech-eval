const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const app = express();

const cors = require('cors');

// error handler and not found
const errorHandler = require('./errors/errorHandler');
const notFound = require('./errors/notFound');
// products router
const productsRouter = require('./products/products.router');

// middleware to avoid cors errors
app.use(cors());
// middleware to handle json sent from client
app.use(express.json());

app.use('/products', productsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
