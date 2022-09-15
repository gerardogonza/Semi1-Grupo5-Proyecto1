import React, {useRef,useState,useEffect} from 'react';
import { Button, Form, Col, Container, Row} from 'react-bootstrap';



const CargarArchivos = () => {
    let [archivos, setArchivos] = useState([]) 


    useEffect(() => {
        var formdata = new FormData();
        var requestOptions = {
            method: 'GET',
            data: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/ListadoArchivos", requestOptions)
        .then(response => response.json())
        .then(result => setArchivos(result))
        .catch(error => console.log('error', error));

    },[])
    






    let file = useRef()    
    let nombreArchivo = useRef()    
    let visibilidad = useRef()    







    //metodo para mandar con el backend
    const EditarArchivo = async () => {
        let file1 = file.current.value
        let nombreArchivo1 = nombreArchivo.current.value
        let visibilidad1 = visibilidad.current.value
        let datos = {
                    file: file1,
                    nombreArchivo: nombreArchivo1,
                    visibilidad: visibilidad1
                }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var a = JSON.stringify({
            "archivo": datos
        });

        var requesOptions = {
            method: 'POST',
            headers: myHeaders,
            body: a,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/ModificarArchivo", requesOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        
        alert('¡Se ha modificado el archivo con éxito!')

    }








    



    return (
        <div>
          <br></br><br></br><br></br><br></br>
          <h1>Editar archivos</h1>


            <Container>
            <br></br><br></br>


                <Row>
                    <Col></Col>

                    <Col>
                        
                        <Row>
                            <Form.Label column>
                                Selecciona un archivo
                            </Form.Label>
                            <Col>
                                <Form.Group controlId="formGridState">
                                    <Form.Select defaultValue="Choose..." ref={file} >
                                        {
                                            archivos.map((option,index) => {
                                                return (<option key={index} value={option}>{option}</option>)
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <br></br>



                        <Row>
                            <Form.Label column lg={2}>
                                Nombre 
                            </Form.Label>
                            <Col>
                                <Form.Control type="text" placeholder="Nuevo nombre del archivo" ref={nombreArchivo} />
                            </Col>
                        </Row>
                        <br></br>


                        <Row>
                            <Form.Label column lg={2}>
                                Tipo 
                            </Form.Label>
                            <Col>
                                <Form.Control type="text" placeholder="Publico, Privado" ref={visibilidad} />
                            </Col>
                        </Row>
                        <Row><br></br></Row>



                        <Row>
                            <Button  onClick={EditarArchivo} variant="outline-info" size="lg">
                                Editar archivo
                            </Button>  
                        </Row>
                    </Col>

                    <Col></Col>
                </Row>
            </Container>

        </div>
    )
}


export default CargarArchivos