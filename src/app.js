const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const {
  usersRoutes,
  sessionRoutes,
  productRoutes,
  fileRoutes,
} = require('./routes');
const jsonCheck = require('./middlewares/jsonCheck');
const authMiddleware = require('./middlewares/auth');

require('./models');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(bodyParser.json());
    this.server.use(jsonCheck);
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'upload')));
  }

  routes() {
    this.server.use('/sessions', sessionRoutes);
    this.server.use('/users', authMiddleware, usersRoutes);
    this.server.use('/products', authMiddleware, productRoutes);
    this.server.use('/files', authMiddleware, fileRoutes);
    this.server.use((req, res) => {
      res.status(400).send('404: Page not found');
    });
  }
}

module.exports = new App().server;
