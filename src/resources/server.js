require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./api_users');
const productRoutes = require('./api_product');
const registerRoute = require('./api_register');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes);
app.use(productRoutes);
app.use(registerRoute);

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
