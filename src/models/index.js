import Sequelize from 'sequelize';
import NameSchema from './name.model'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/db/db.sqlite'
  });


const Name = NameSchema(sequelize, Sequelize)

const db = {
    Sequelize,
    sequelize,
    Name,
};

module.exports = db;