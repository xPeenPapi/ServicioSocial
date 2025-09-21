import * as fs from 'fs'
import * as path from 'path'
import { User } from "./User";
import Formmodel from '../models/formmodel';
import Salamodel from '../models/salamodel';
import Salavistamodel from '../models/salavistamodel';

function generarClave(longitud = 8) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let clave = '';
    for (let i = 0; i < longitud; i++) {
        clave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return clave;
}
export class Maestro extends User{
    public id: number;

    constructor(id:number){
        super();
        this.id = id
    }
    async crearsala(salaid:number, idcreador:number, formid:number){
        try{
            const clave = generarClave();
            await Salamodel.create({
                id:salaid,
                idcreador:idcreador,
                idformulario:formid,
                fechacreacion: new Date().toISOString().slice(0, 10),
                fechacierre:"",
                rankingruta:"",
                activo:'A',
                clave: clave,
            })
            
            return "Usuario Registrado"
        }catch(error){
            console.error(error)
            return "No se pudo añadir el usuario"
        }
    }

    async crearformulario(body:any){
        const formsDir = path.resolve(__dirname, '..','..', 'forms') //sube dos niveles en los directorios
        const fileName = `formulario_${this.id}_${Math.floor(Math.random() * 1000 + 1)}.json`
        const filePath = path.join(formsDir, fileName)
        
        try{
            if(!fs.existsSync(formsDir)){
                fs.mkdirSync(formsDir, {recursive:true})
            }
            const jsonString = JSON.stringify(body, null, 2)
            fs.writeFileSync(filePath, jsonString, 'utf-8')
            const formulario = await Formmodel.create({
                titulo: body.tituloform,
                rutaform: filePath.toString(),
                rutaformresult: "",
                cantparticipantes: 0
            })
            console.log(formulario.dataValues.id)
            return (formulario.dataValues.id)
        }catch(error){
            console.error("No se pudo guardar el formulario debido al siguiente error: ", error)
            return ("Error al crear el formulario")
        }
        
    } 

    
 
    async obtenerlistasalas(){
        try {
            const participacion = await Salavistamodel.findAll({
                where:{
                    'Id de creador':this.id
                }
            })
    
            return participacion
            
        } catch (error) {
            console.error(error)
            return "No se pudieron obtener los datos"
        }
    }
}