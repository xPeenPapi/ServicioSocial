import * as fs from 'fs'
import { promises as fspromiss } from 'fs';
import Formmodel from '../models/formmodel';


export class Formulario{
    obtenerrespuestas(rutasresultados:any){
        console.log("Esto recibe la funcion obtenerrespuestas", rutasresultados)
        let resupuestas: number[][] = []  //matriz donde se guardaran las respuestas. cada fila corresponde a un alumno y cada columna a una pregunta, el numero indica
        let i = 0                         //la repsuesta que eligió
        for(const element of rutasresultados){
            if (!resupuestas[i]) { 
                resupuestas[i] = [];
              }
            const rawresultado = fs.readFileSync(element, 'utf-8')
            const jsonresultado = JSON.parse(rawresultado)
            console.log("Esto se obtiene de las rutas", jsonresultado)
            let j = 0
            for(const pregunta of jsonresultado.questions){ //Accede al parametro question que hay en el json
                
                resupuestas[i][j] = pregunta.electionindex //accede al parametro electionindex de cada question
                j++ 
            }
       
            i++
        }
        return resupuestas
    } 

    obtenertiempos(rutasresultados:any){
        console.log("Esto recibe la funcion obtenerrespuestas", rutasresultados)
        let tiempos: number[][] = []  //matriz donde se guardaran los tiempos. cada fila corresponde a un alumno y cada columna a una pregunta, el numero indica
        let i = 0                     //elt tiempo que eligio
        for(const element of rutasresultados){
            if (!tiempos[i]) { 
                tiempos[i] = [];
              }
            const rawresultado = fs.readFileSync(element, 'utf-8')
            const jsonresultado = JSON.parse(rawresultado)
            console.log("Esto se obtiene de las rutas", jsonresultado)
            let j = 0
            for(const pregunta of jsonresultado.questions){ //Accede al parametro question que hay en el json
                
                tiempos[i][j] = pregunta.tiempo //accede al parametro tiempo de cada question
                j++ 
            }
       
            i++
        }
        return tiempos
    }
    crearresultados(resultados:any, respuestas:number[][], tiempos:number[][]){
        let i = 0
        for (const usuario of resultados){
            let j = 0
            for(let j = 0; j < respuestas[i].length; j++){
                const nombreCampo = `Respuesta pregunta ${j}`
                usuario[nombreCampo] = respuestas[i][j]
                const campotiempo = `Tiempo pregunta ${j}`
                usuario[campotiempo] = tiempos[i][j] 
            }
            i++
        }
        //console.log(respuestas)
        console.log(resultados) 
        return(resultados)
    }

    async eliminarformulario(idformulario:number){
        try {
            const rutaform = await Formmodel.findOne({ //Se buscan los datos del formulario 
                where:{
                    id:idformulario
                }
            })
            await Formmodel.destroy({
                where:{
                    id:idformulario
                }
            })
            try { //Ademas de eliminar el formulario de la base de datos tambien se eliminara el archivo vinculado a este
                await fspromiss.access(rutaform?.dataValues.rutaform) //Checa que el formulario exista
                await fspromiss.unlink(rutaform?.dataValues.rutaform) //Elimina el formulario
                console.log("Archivo eliminado")
            } catch (error) {
                console.error("No se pudo eliminar el archivo: ", error)
            }

        } catch (error) {
            console.error("No se pudo eliminar el formulario", error)
        }
        
    }
}