const modules = require('../exports');

const path = modules.path;
const express = modules.express;
const Sequelize = modules.Sequelize;
const Datatypes = modules.DataTypes;
const Op = modules.Op;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'music.sqlite'),
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

const Artist = sequelize.define('Artist', {
  name: {
    type: Datatypes.TEXT,
    defaultValue: 'Unknown',
  },
  id: {
    type: Datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

const Song = sequelize.define('Song', {
  id: {
    type: Datatypes.TEXT,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Datatypes.TEXT,
    defaultValue: 'Unknown',
  },
  artist_id: {
    type: Datatypes.INTEGER,
  },
  artist: {
    type: Datatypes.TEXT,
  },
});
