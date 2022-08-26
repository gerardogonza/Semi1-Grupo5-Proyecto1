import React from "react";
import { Button } from "react-bootstrap";

function Dashboard() {
    return (
        <div className="container mt-5">
            <div className="row ">

                <div className="col-sm-3" >
                    <div className="card" style={{ width: "18rem;" }}>
                        <img className="card-img-top" src="https://phantom-marca.unidadeditorial.es/c4774ae494d5a7076deb94e0a15add93/resize/1320/f/jpg/assets/multimedia/imagenes/2022/07/13/16577436865955.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">User Name</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">

                                </li>
                                <li className="list-group-item"><Button variant="primary" size="sm">Subir Archivo</Button></li>
                                <li className="list-group-item"><Button variant="primary" size="sm">Editar Archivo</Button></li>
                                <li className="list-group-item"><Button variant="primary" size="sm">ELiminar Archivo</Button></li>
                                <li className="list-group-item"><Button variant="primary" size="sm">Agregar Archivo</Button></li>
                                <li className="list-group-item"><Button variant="primary" size="sm">Ver Archivo</Button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-sm-9" style={{border: '1px solid black'}} >
                    <div className="row " >
                        <h3>Publico</h3>
                        <hr />
                        <div className="col-sm-3" >
                        <img className="card-img-top" src="https://phantom-marca.unidadeditorial.es/c4774ae494d5a7076deb94e0a15add93/resize/1320/f/jpg/assets/multimedia/imagenes/2022/07/13/16577436865955.jpg" alt="Card image cap" />
                        </div>
                        <div className="col-sm-3" >
                            <p>Nombre: Proven</p>
                            <p>Propietario usuario</p>
                            <p>Fecha: 32/23/2000</p>
                            <Button variant="primary" size="sm">ver</Button>
                        </div>
                        <div className="col-sm-3" >
                        <img className="card-img-top" src="data:image/png;base64,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" alt="Card image cap" />
                      
                        </div>
                        <div className="col-sm-3" >
                             <p>Nombre: Proven</p>
                            <p>Propietario usuario</p>
                            <p>Fecha: 32/23/2000</p>
                            <Button variant="primary" size="sm">ver</Button>
                        </div>
                        <hr/>
                    </div>
                    <div className="row ">
                    <h3>Privado</h3>
                    <div className="col-sm-3" >
                        <img className="card-img-top" src="https://phantom-marca.unidadeditorial.es/c4774ae494d5a7076deb94e0a15add93/resize/1320/f/jpg/assets/multimedia/imagenes/2022/07/13/16577436865955.jpg" alt="Card image cap" />
                        </div>
                        <div className="col-sm-3" >
                            <p>Nombre: Proven</p>
                            <p>Propietario usuario</p>
                            <p>Fecha: 32/23/2000</p>
                            <Button variant="primary" size="sm">ver</Button>
                        </div>
                        <div className="col-sm-3" >
                        <img className="card-img-top" src="data:image/png;base64,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" alt="Card image cap" />
                        </div>
                        <div className="col-sm-3" >
                             <p>Nombre: Proven</p>
                            <p>Propietario usuario</p>
                            <p>Fecha: 32/23/2000</p>
                            <Button variant="primary" size="sm">ver</Button>
                        </div>
                    <hr/>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Dashboard;