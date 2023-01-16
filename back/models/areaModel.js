const  {  Model, DataTypes, GEOMETRY } = require('sequelize')
const connection = require('../db/connection')

class Area extends Model {}

Area.init({
    myUuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    center:{
        type: DataTypes.JSON,
        allowNull: false
    },
    paths:{
        type: DataTypes.GEOMETRY("POLYGON"),
        allowNull: false
    },
    zoneInfo: {
        type: DataTypes.JSON,
        allowNull: false
    }
},{ 
    sequelize: connection.connection
  })

    Area.sync();

module.exports = Area