import Formmodel from "../models/formmodel";
import Participacionmodel from "../models/participacionmodel";
import Salamodel from "../models/salamodel";
import { User } from "./User";
import * as fs from 'fs'
import * as path from 'path'

export class Alumno extends User{
    
    async entrarasala(salaid:string, iduser:number){
        //busca la sala con el id que le das
        const formid = await Salamodel.findOne({
            attributes:['idformulario', 'id'],
            where:{
                clave:salaid
            }
        })
        
        const idsala = formid?.dataValues.id //id de la sala
        console.log(idsala)

        const idfomrilario = formid?.dataValues.idformulario
        console.log(idfomrilario)
        //busca la ruta del formulario
        const formularioruta = await Formmodel.findOne({
            attributes:['rutaform'],
            where:{
                id:idfomrilario
            }
        })
        
        await Salamodel.increment('cantparticipantes', {
            by: 1,
            where:{id:idsala}
        })

        await Participacionmodel.create({
            iduser:iduser,
            idsala:idsala,
        })
        const rutaformulario = formularioruta?.dataValues.rutaform
        console.log(rutaformulario)
        
        //recuperamos el contenido del json

        const rawform = fs.readFileSync(rutaformulario, 'utf-8')
        const jsonform = JSON.parse(rawform)

        console.log (jsonform)
        return jsonform
    }

    // AQUI TAMBIEN LOS DESHICE
    async enviarrespuestas(resultados: any, iduser:number, idsala:number, calificacion:number){
        const formsDir = path.resolve(__dirname, '..','..', 'forms', 'resultados') //sube dos niveles en los directorios
        const fileName = `resultado_formulario_${iduser}_${idsala}.json`
        const filePath = path.join(formsDir, fileName)
        try{
            if(!fs.existsSync(formsDir)){
                fs.mkdirSync(formsDir, {recursive:true})
            }
            const jsonString = JSON.stringify(resultados, null, 2)
            fs.writeFileSync(filePath, jsonString, 'utf-8')
            await Participacionmodel.update(
                {
                    calificacion:calificacion,
                    rutaresultados:filePath.toString()
                },
                {
                    where:{
                        iduser:iduser,
                        idsala:idsala
                    }
                }
            )
            return "añadida participacion del usuario:"
        }catch(error){
            console.error("No se pudo guardar el formulario debido al siguiente error: ", error)
            return ("Error al crear el formulario")
        }
        
    }
    // AQUI TERMINA LA PARTE QUE DESHICE

    async obtenerlistaparticipaciones(iduser:string){
        try {
            const participacion = await Participacionmodel.findAll({
                where:{
                    iduser:iduser
                }
            })

            console.log(participacion)
            return(participacion)

        } catch (error) {
            console.log(error)
            return("No se encontraron participaciones para este usuario")
        }
    }

    async obtenerresultados(idsala:string, iduser:string){
        try {
            const participacion = await Participacionmodel.findOne({
                where:{
                    idsala:idsala,
                    iduser:iduser
                }
            })
            
            const rutajson = participacion?.dataValues.rutaresultados
            const rawform = fs.readFileSync(rutajson, 'utf-8')
            const jsonform = JSON.parse(rawform)

            console.log (jsonform)
            return jsonform
            
        } catch (error) {
            console.error(error)
            return "No se pudieron obtener los datos"
        }
        
    }
}