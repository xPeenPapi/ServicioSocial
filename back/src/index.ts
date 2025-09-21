/*----------Instalaciones----------
    -Nodemon
    -Typescript
    -cuando hayas instalado eso escribe en consola tsc --init
    -Luego escribe tsc en la consola
    -Antes de empezar a probar y eso ten abiertas dos consolas y escribe
    en una nodemon.js y en la otra tsc --watch y ya cualquier cambio que hagas
    hazlo en los typescript
    -para que se corra usa el comando nodemon dist/index.js

    Dependencias:
    npm i express    -Con esto se crea la api rest 
    npm i dotenv     -Para las configuraciones de variables de entorno
    npm i cors       -No me quedo claro para que sirve pero instalalo
    npm i sequelize mysql2  -Esto para la base de datos

 */

import Server from "./models/server";
import dotenv from 'dotenv'
import express from "express";

const app = express();
app.use(express.json());

//Configura variables de entorno
dotenv.config() 

const server = new Server() 
