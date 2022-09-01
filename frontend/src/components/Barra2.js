import React, {useEffect, useState} from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';





const Barra2 = () => {
    const [usuario_logueado, setUsuario_logueado] = useState(undefined)


    useEffect(() => {
        var formdata = new FormData();
        var requestOptions = {
            method: 'GET',
            data: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:9000/usuarios/usuario_logueado", requestOptions)
        .then(response => response.json())
        .then(result => setUsuario_logueado(result))
        .catch(error => console.log('error', error));

    },[])


    const sale = () =>{
        var formdata = new FormData();
        var requestOptions = {
            method: 'GET',
            data: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:9000/usuarios/limpiar_logueo", requestOptions)
        .then(response => response.json())
        .then(result => setUsuario_logueado(result))
        .catch(error => console.log('error', error));


    }





    if(usuario_logueado !== undefined)
    {

        // ES EL ADMINISTRADOR   
        if ( usuario_logueado.rol === "admin" ){
            return (
                <div>
                    <Navbar bg="primary" variant="dark">
                        <Container>
                            <Nav className="me-auto">
                                <h1>admin</h1>
                                <Nav.Link href="/agregar_amigos">Agregar amigos</Nav.Link>
                                <Nav.Link href="/ver_archivos">Ver archivos</Nav.Link>
                                <Nav.Link href="/cargar_archivo">Cargar archivos</Nav.Link>
                                <Nav.Link onClick={sale} href="/">Cerrar sesion</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
        
                </div>
            )
        }




    // EL USUARIO NO ESTA LOGUEADO  
    } else {
        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Nav className="me-auto">
                            <h1>¡Bienvenido!</h1>
                            <Nav.Link href="/">Login</Nav.Link>
                            
                        </Nav>
                    </Container>
                </Navbar>
    
            </div>
        )
    }



}


export default Barra2
