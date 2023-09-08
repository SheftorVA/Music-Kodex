const express = require('express');
const models = require('./models/models');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  const songs = await models.Song.findAll();
  res.json(songs);
});

router.post('/', async (req, res, next) => {
  try {
    const song = await models.Song.create({
      name: req.body.song,
    });
    await song.createArtist({ name: req.body.name });
    // artist.createSong(song);
    res.end();
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res) => {
  await models.Song.update(
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
  await models.Song.destroy({
    where: {
      id: req.params.id,
    },
  });
});

module.exports = router;
