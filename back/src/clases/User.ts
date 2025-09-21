import Usermodel from "../models/usermodel";

export class User {
    public id: number;
    public username: string;
    public password: string;
    public correo: string;
    public tipousuario: string;

    constructor(){
        this.id = 0
        this.username = ''
        this.password = ''
        this.correo = ''
        this.tipousuario = ''
    }
 
    async login(username:string, password: string){
        try{
            const user = await Usermodel.findAll({
                where:{
                    username: username,
                    password: password
                }
            })
            console.log (user)
            return user
        }catch (error){
            console.error("No se pudo obtener el usuario")
            console.error(error); // <-- Este debe imprimir el mensaje real
            return null
        }
        

    }

    async register(body: any){
        try{
            await Usermodel.create(body)
            console.log(body)
            return "Usuario Registrado"
        }catch(error){
            console.error(error)
            return "No se pudo añadir el usuario"
        }
    }

    async listuser(){
        try{
            const Listuser = await Usermodel.findAll()
            return Listuser
        }catch (error) {
            console.error(error); // <-- Este debe imprimir el mensaje real
            
          }
        
    }
    
}