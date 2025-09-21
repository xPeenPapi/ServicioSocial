import { Request, Response } from "express"
import { User } from "../clases/User"
import { Maestro } from "../clases/Maestro";
import { Alumno } from "../clases/Alumno";
import { Sala } from "../clases/Sala";

//metdodo para el login
export const getUser = async (req: Request, res: Response) =>{
    try {
        //El metodo espera un objeto de tipo json con esos dos parametros como request, 
        const { username, password } = req.body;
        
        const user = new User();
        const usuario = await user.login(username, password); //Los dos parametros de la request los envia a la funcion login, si las credenciales son correctas devuelve los datos completos del usuario
        
        res.json(usuario);//Envia al cliente un objeto de tipo json con todos los datos del usuario
      } catch (error) {
        console.error('Error en getUser:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
      }
}


//Metodo para realizar el registro
export const signup = (req: Request, res: Response) =>{
    const {body} = req;
    const user = new User();
    const registro = user.register(body)

    res.json({
        msg: registro
    }) 
}

//Nomas lista todos los usuarios de la base de datos, no se usa fue nomas para calar que jalara la api
export const getUsers = async (req: Request, res: Response) =>{
    const user = new User()
    const listausuarios = await user.listuser()
    res.json(listausuarios)
    
}

//con esta se crea la sala
export const createsala = async (req:Request, res:Response) =>{
    const {body} = req
    const {userId} = req.body
    const {salaid} = req.body
    const maestro = new Maestro(userId)
    try{
        const guardarform = maestro.crearformulario(body)
        maestro.crearsala(salaid, userId, await guardarform)
        res.json("Sala creada")
    }catch(error){
        res.json("error al crear la sala")
        console.error(error)
    }
    
    //
}

//con esta el alumno recibe el formulario
export const getformulario = async (req:Request, res:Response) =>{
    const {salaid} = req.params
    const {iduser} = req.params
    const alumno = new Alumno()
    console.log(salaid)
    
    try{
        const rutaformulario = await alumno.entrarasala(salaid, parseInt(iduser))
        res.json(rutaformulario)
        
    }catch(error){
        console.error('Error al buscar la sala', error)
        res.json("No se pudo obtener la ruta")
    }
}

// DESHICE LOS CAMBIOS QUE HABÍAMOS HECHO PARA QUE CHEQUES CON CABEZA FRÍA, ESTO ES LO QUE TENÍAS ANTES
//Aqui el alumno envia el resultado
export const enviarresultados = async (req:Request, res:Response) =>{
    const {body} = req
    const{salaid, participanteid, calificacion} = req.body
    const alumno = new Alumno()
    const insercion = await alumno.enviarrespuestas(body, participanteid, salaid, calificacion)
    res.json({
        msg:insercion
    })
}
// AQUÍ TERMINA LA PARTE QUE DESHICE


//aqui el maestro recibe el resultado de toda la actividad
export const recibirresultados = async (req:Request, res:Response) =>{
    const {salaid} = req.params

    const sala = new Sala(parseInt(salaid))
    const resultados = await sala.recuperarresultados()
    res.json(resultados)
}

//el alumno recibe los resultados
export const recibirresultadoalumno = async (req:Request, res:Response) =>{
    const {salaid} = req.params
    const {alumnoid} = req.params
    const alumno = new Alumno()
    const resultado = await alumno.obtenerresultados(salaid, alumnoid)
    
    res.json(resultado)
}

//lista de salas en las que participo un alumno
export const listaparticipaciones = async (req:Request, res:Response) =>{
    const {iduser} = req.params
    const alumno = new Alumno()
    const lista = await alumno.obtenerlistaparticipaciones(iduser)
    res.json(lista)
}

//lista de salas creadas por maestro
export const listasalas = async (req:Request, res:Response) =>{
    const {iduser} = req.params
    const maestro = new Maestro(parseInt(iduser))
    const lista = await maestro.obtenerlistasalas()
    res.json(lista)
}

//esta para actualizar los participantes que hay en cada sala
export const usuariosparticipantes = async (req:Request, res:Response) =>{
    const {idsala} = req.params
    const sala = new Sala(parseInt(idsala))

    const listausuarios = await sala.obtenerlistaparticipantes(parseInt(idsala))

    res.json(listausuarios)
}

export const enviarGoogle = async (req:Request, res:Response) => {
    const {token} = req.params
    console.log (token)
    res.json('google')
}

export const enviarMicrosoft = async (req:Request, res:Response) =>{
    const{token} = req.params
    console.log (token)
    res.json('microsoft')
}

export const eliminarsala = async(req:Request, res:Response) => {
    const {salaid} = req.params
    const sala = new Sala(parseInt(salaid))
    const respuesta = await sala.eliminarsala()
    res.json(respuesta)
}
//Haz una vista que incluya la informacion de las salas y sus creadores y titulos y asi