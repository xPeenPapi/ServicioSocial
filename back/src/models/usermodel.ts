import db from '../db/connection'
import { DataTypes } from 'sequelize'

const Usermodel = db.define('users', {
    username: {
        type: DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    correo:{
        type:DataTypes.STRING
    },
    tipousuario:{
        type:DataTypes.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
})
export default Usermodel