import {Request,Response} from 'express';
import { connection } from '../database';
let randomstring = require("randomstring");


export const ejecutar = async function(req:Request, res:Response) {
    // console.log(req.body);
   
    res.json(req.body.hola);
}

export const principal = (req:Request, res:Response) => {
  res.json("Servidor Funcionando :D!");

}

