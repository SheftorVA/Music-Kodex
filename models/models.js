const path = require('path');
const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'music.sqlite'),
});

const Artist = sequelize.define('Artist', {
  name: {
    type: DataTypes.STRING,
    defaultValue: 'Unknown',
    unique: true,
  },
});

const Song = sequelize.define('Song', {
  name: {
    type: DataTypes.STRING,
    defaultValue: 'Unknown',
  },
});

Song.belongsToMany(Artist, { through: 'SongsArtists' });
Artist.belongsToMany(Song, { through: 'SongsArtists' });

module.exports = { Song, Artist, sequelize };
