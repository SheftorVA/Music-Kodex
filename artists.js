const express = require('express');
const models = require('./models/models');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  const artists = await models.Artist.findAll();
  res.json(artists);
});

router.get(':artist/songs', async (req, res) => {
  const artist = await models.Artist.findAll({
    model: models.Song,
    where: {
      name: req.params.artist,
    },
  });
  const songs = await artist.getSongs();
  res.json(songs);
});

router.post('/', async (req, res, next) => {
  try {
    await models.Artist.create({ name: req.body.name });
    res.end();
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res) => {
  await models.Artist.update(
    { name: req.body.name },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.end();
});

router.delete('/:id', async (req, res) => {
  await models.Artist.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.end();
});

module.exports = router;
