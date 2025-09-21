//Este modelo contiene lo que recibe el profesor al querer ver los resultados
import db from '../db/connection'
import { DataTypes } from 'sequelize'

const Resultadoparticipacionmodel = db.define('vista_participantes',{
    'ID de sala':{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    'ID de formulario':{
        type:DataTypes.INTEGER
    },
   
    'ID participacion':{
        type:DataTypes.INTEGER
    },
    'Nombre participante':{
        type:DataTypes.STRING
    },
    'Calificacion':{
        type:DataTypes.INTEGER
    },
    'Ruta del resultado':{
        type:DataTypes.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
})
export default Resultadoparticipacionmodel