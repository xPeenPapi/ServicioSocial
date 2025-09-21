import db from '../db/connection'
import { DataTypes } from 'sequelize'

const Participacionmodel = db.define('detalleparticipaciones',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    iduser:{
        type:DataTypes.INTEGER
    },
   
    idsala:{
        type:DataTypes.INTEGER
    },
    calificacion:{
        type:DataTypes.INTEGER
    },
    rutaresultados:{
        type:DataTypes.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
})
export default Participacionmodel