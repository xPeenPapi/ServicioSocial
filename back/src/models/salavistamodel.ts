import db from '../db/connection'
import { DataTypes } from 'sequelize'

const Salavistamodel = db.define('vista_salas',{
    'Id de Sala':{
        type:DataTypes.INTEGER,
        primaryKey:true,
    },
    'Id de creador':{
        type:DataTypes.INTEGER
    },
    'Nombre de creador':{
        type:DataTypes.STRING
    },
    'Id de formulario':{
        type:DataTypes.INTEGER
    },
    'Titulo de formulario':{
        type:DataTypes.STRING
    },
    'Ruta de formulario':{
        type:DataTypes.STRING
    },
    'Fecha de creacion':{
        type:DataTypes.STRING
    },
    'clave':{
        type:DataTypes.STRING  
    },
    
},{
    freezeTableName: true,
    timestamps: false
})
export default Salavistamodel