import Formmodel from '../models/formmodel'
import Resultadoparticipacionmodel from '../models/resultadosmodel'
import Salamodel from '../models/salamodel'
import { Formulario } from './Formularios'
import * as fs from 'fs'

export class Sala{
    public idSala:number

    constructor(idSala:number){
        this.idSala = idSala
    }
    
    async recuperarresultados(){
        try {
            const resultadosraw = await Resultadoparticipacionmodel.findAll({
                where:{
                    'ID de sala':this.idSala
                }
            })
            
            const formulario = await Formmodel.findOne({ //Este es el formulario original de la sala
                where:{
                    id:resultadosraw[0].dataValues['ID de formulario']
                }
            })
            
            let resultadosretunr = []
            const resultados = resultadosraw.map(result => result.get({plain: true})) //Aqui se guardan en un json la informacion de las participaciones obtenidas de la base de datos
            const rutas = resultados.map(r=>r["Ruta del resultado"]) //Aqui solo extraemos las rutas con las respuestas de cada usuario en el orden que aparecen
            const formObject = new Formulario() //objeto para acceder a los metodos de los formularios
            const respuestas = formObject.obtenerrespuestas(rutas) //Se obtiene una matriz con las respuestas de todos los usuarios
            const tiempos = formObject.obtenertiempos(rutas)
            const resultadoscompletos = formObject.crearresultados(resultados, respuestas, tiempos)

            const rawformoriginal = fs.readFileSync(formulario?.dataValues.rutaform, 'utf-8')
            const jsonformoriginal = JSON.parse(rawformoriginal)

            console.log("Los alumnos respondieron con", respuestas)
            resultadosretunr[0] = resultadoscompletos
            resultadosretunr[1] = jsonformoriginal
            
            return resultadosretunr
        } catch (error) {
            console.error(error)
            return ("A ocurrido un error al obtener los resultados")
        }
        

        
    }
 
    async obtenerlistaparticipantes(idsala:number){
        try{
            const lista = await Resultadoparticipacionmodel.findAll({
                where:{
                    'ID de sala':idsala
                }
            })
            return lista
        } catch (error) {
            console.error(error)
            return "Ha ocurrido un error al recuperar los participantes"
        }
    }

    async eliminarsala(){
        try {
            const sala = await Salamodel.findOne({ //Se busca este registro para obtener los datos de la sala
                where:{
                   id:this.idSala 
                }
            })
            await Salamodel.destroy({
                where:{
                    id:this.idSala
                }
            })
            const formularioid = await sala?.dataValues.idformulario //Se obtiene el id del formulario
            console.log(formularioid)
            const formulrio = new Formulario()
            formulrio.eliminarformulario(formularioid) //Se llama a un metodo que eliminara el formulario de la BD
            return("Sala eliminada correctamente")
        } catch (error) {
            console.error("Error al eliminar la sala:", error)
            return("Error al eliminar la sala")
        }
    }
}