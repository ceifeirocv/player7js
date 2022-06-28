const express = require('express');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users');

const app = express();
const PORT = 3333;

app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));
