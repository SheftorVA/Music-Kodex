const express = require('express');
const artists = require('./artists');
const songs = require('./songs');
const models = require('./models/models');

const app = express();

const synchronization = async () => {
  await models.sequelize.sync({ force: true });
};

synchronization();

app.use('/artists', artists);
app.use('/songs', songs);
app.use('/', (req, res, next) => {
  res.status(404).json({ error: '404 Not found' });
  next();
});
app.use((err, req, res, next) => {
  res.status(500).json({ error: err });
});
app.listen(3000);
