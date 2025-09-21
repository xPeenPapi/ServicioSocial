import db from '../db/connection'
import { DataTypes } from 'sequelize'

const Salamodel = db.define('sala',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
    },
    idcreador:{
        type:DataTypes.INTEGER
    },
    idformulario:{
        type:DataTypes.INTEGER
    },
    fechacreacion:{
        type:DataTypes.STRING
    },
    fechacierre:{
        type:DataTypes.STRING
    },
    rankingruta:{
        type:DataTypes.STRING
    },
    cantparticipantes:{
        type:DataTypes.STRING
    },
    activo:{
        type:DataTypes.CHAR
    },
    clave: {
        type: DataTypes.STRING,
        unique: true
    }
    
},{
    freezeTableName: true,
    timestamps: false
})
export default Salamodel