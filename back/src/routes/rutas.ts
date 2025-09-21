import {Router} from 'express';
import { getUser, signup, getUsers, createsala, getformulario, enviarresultados, recibirresultados, recibirresultadoalumno, listaparticipaciones, listasalas, usuariosparticipantes, enviarGoogle, enviarMicrosoft, eliminarsala } from '../controllers/controladores'

const router = Router()

router.get('/', getUsers)//Nomas lista todos los usuarios de la base de datos, no se usa fue nomas para calar que jalara la api
router.post('/login', getUser)//metdodo para el login
router.post('/signup', signup)//Metodo para realizar el registro
router.post('/crearsala', createsala)//con esta se crea la sala
router.get('/entrarsala/:salaid/:iduser', getformulario)//con esta el alumno recibe el formulario
router.post('/enviarresultado', enviarresultados)//Aqui el alumno envia el resultado
router.get('/obtenerresultado/:salaid', recibirresultados)//aqui el maestro recibe el resultado de toda la actividad
router.get('/obtenerresultadoalumno/:salaid/:alumnoid', recibirresultadoalumno)//el alumno recibe los resultados work in progress (no se va a hacer)
router.get('/obtenerlistaresultados/:iduser', listaparticipaciones)//lista de salas en las que participo un alumno
router.get('/obtenerlistasalas/:iduser', listasalas)//lista de salas creadas por maestro
router.get('/obtenerlistaparticipantes/:idsala', usuariosparticipantes)//esta para actualizar los participantes que hay en cada sala
router.post('/login/google/:token', enviarGoogle)
router.post('/login/microsoft/:token', enviarMicrosoft)
router.delete('/eliminarsala/:salaid', eliminarsala)
 

export default router