import React from "react";
import { Row, Col, Container, Button} from 'react-bootstrap';

import Card from "./Card";

import Img1 from './Imagenes/1.png'
import Img2 from './Imagenes/3.png'
import Img3 from './Imagenes/2.png'
import Img4 from './Imagenes/4.png'
import Img5 from './Imagenes/5.png'


const cards = [
    {
      id: 1,
      title: "Usuario 1",
      image: Img1,
      text: "20 archivos publicos",
    },
    {
      id: 2,
      title: "Usuario 2",
      image: Img2,
      text: "20 archivos publicos",
    },
    {
      id: 3,
      title: "Usuario 3",
      image: Img3,
      text: "20 archivos publicos",
    },
    {
      id: 4,
      title: "Usuario 4",
      image: Img5,
      text: "20 archivos publicos",
    },
    {
      id: 5,
      title: "Usuario 5",
      image: Img4,
      text: "20 archivos publicos",
    },
  ];


function ListadoUsuarios() {
  return (
        <div>

            <br/>

              <Container>
                <Row>
                    <Col>
                      <input type="text" class="form-control" placeholder="Usuario" aria-label="Usuario"/>
                    </Col>
                    <Col>
                      <Button onClick="" variant="outline-primary" size="lg" >
                        Buscar
                      </Button>
                    </Col>
                </Row>
            </Container>

            <br/>


            <Container>
            <Row>
                {cards.map(({ title, image, text, id }) => (
                <div className="col-md-4" key={id}>
                <br/>
                    <Card imageSource={image} title={title} text={text}/>
                </div>
                ))}
            </Row>
            </Container>
        </div>
  );
}

export default ListadoUsuarios;
