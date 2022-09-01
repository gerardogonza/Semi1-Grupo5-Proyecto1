import React from "react";

import ListadoUsuarios from './ListadoUsuarios';
import Barra from '../Barra'

function AgregarAmigos() {
    return (
          <div>
            <Barra/>
            <br></br>
            <ListadoUsuarios/>
          </div>
    );
  }
  
  export default AgregarAmigos;