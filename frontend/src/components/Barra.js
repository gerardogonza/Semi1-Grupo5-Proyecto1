import React, {useEffect, useState} from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';





const Barra = () => {
    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <h1>¡Bienvenido!</h1>
                        <Nav.Link href="/">Login</Nav.Link>
                        <Nav.Link href="/agregar_amigos">Agregar amigos</Nav.Link>
                        <Nav.Link href="/ver_archivos">Ver archivos</Nav.Link>
                        <Nav.Link href="/cargar_archivo">Cargar archivos</Nav.Link>
                        <Nav.Link onClick="" href="/">Cerrar sesion</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
    
        </div>
    )
    



}


export default Barra
