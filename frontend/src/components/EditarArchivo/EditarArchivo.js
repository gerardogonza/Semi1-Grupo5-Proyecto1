import React, { useRef, useState, useEffect } from "react";
import { Button, Form, Col, Container, Row } from "react-bootstrap";
import { methodPOST, editarArchivo } from "../../services/api";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CargarArchivos = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const [datosDashboard, setDatosDashboard] = useState(location.state);
  const [tipo, setTipo] = useState("");
  useEffect(() => {}, []);

  const editarTipo = async (name) => {
    const respuesta = await methodPOST(editarArchivo, {
      name: datosDashboard.name,
      new_name: datosDashboard.name,
      owner: datosDashboard.datosDashboard[0]?.username,
      type: tipo,
    });
    console.log({  name: datosDashboard.name,
        new_name: datosDashboard.name,
        owner: datosDashboard.datosDashboard[0]?.username,
        type: tipo,});
    navigate("/dashboard", { state: datosDashboard.datosDashboard });
    console.log(tipo);
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Editar archivos</h1>

      <Container>
        <br></br>
        <br></br>

        <Row>
          <Col></Col>

          <Col>
            {/* <Row>
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
                        </Row> */}
            <br></br>

            {/* 
                        <Row>
                            <Form.Label column lg={2}>
                                Nombre 
                            </Form.Label>
                            <Col>
                                <Form.Control type="text" placeholder="Nuevo nombre del archivo" ref={nombreArchivo} />
                            </Col>
                        </Row> */}
            <br></br>

            <Row>
              <label>Nombre: {datosDashboard.name} </label>
              <label>USER: {datosDashboard.datosDashboard[0]?.username}</label>
            </Row>
            <Row>
              <Form.Label column lg={2}   >
                Tipo
              </Form.Label>
              <Col>
                <Form.Control type="text" placeholder="Public, Private" onChange={(e) => setTipo(e.target.value)} />
              </Col>
            </Row>
            <Row>
              <br></br>
            </Row>

            <Row>
              <Button
                variant="outline-info"
                size="lg"
                onClick={() => editarTipo()}
              >
                Editar archivo
              </Button>
            </Row>
          </Col>

          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default CargarArchivos;
