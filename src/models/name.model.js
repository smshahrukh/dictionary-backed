
const NameSchema = (sequelize, Sequelize) => {
    const { DataTypes } = Sequelize
    const { INTEGER, STRING } = DataTypes
  
    const Name = sequelize.define('name', {
      id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: STRING,
        allowNull: false,
        unique: true
      }
    }, {
      indexes: [
        // Create a unique index on email
        {
          unique: true,
          fields: ['name']
        }
      ]
    });


    return Name
  
  }
  
  export default NameSchema;