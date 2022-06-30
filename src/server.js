const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./models');

const { usersRoutes, sessionRoutes } = require('./routes');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(bodyParser.json());

app.use('/users', usersRoutes);
app.use('/sessions', sessionRoutes);

app.use((req, res) => {
  res.status(400).send('404: Page not found');
});

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));
