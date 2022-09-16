import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { methodPOST, dashboard } from "../../services/api";
function Dashboard() {
  const location = useLocation();
  let navigate = useNavigate();
  const [datosDashboard, setDatosDashboard] = useState(location.state);
  const [archivoPublico, setArchivoPublico] = useState([]);
  const [archivoPrivado, setArchivoPrivado] = useState([]);
  const [foto, setFoto] = useState("");
  const getArchivosPublicos = async () => {
    const respuesta = await methodPOST(dashboard, {
      //   owner: "emivnajera",
      owner: datosDashboard[0]?.username,
      type: "public",
    });
    setArchivoPublico(respuesta.files);
    setFoto(respuesta.foto);
    console.log(respuesta);
  };

  const getArchivosPrivados = async () => {
    const respuesta = await methodPOST(dashboard, {
      // owner: "emivnajera",
      owner: datosDashboard[0]?.username,
      type: "private",
    });
    setArchivoPrivado(respuesta.files);
    setFoto(respuesta.foto);
    console.log(respuesta);
  };
  useEffect(() => {
    getArchivosPublicos();
    getArchivosPrivados();
  }, [foto]);
  return (
    <div className="container mt-5">
      <div className="row ">
        <div className="col-sm-3">
          <div className="card" style={{ width: "18rem;" }}>
            <img
              className="card-img-top"
              src={foto}
              alt="Card image cap"
            />
            <div className="card-body">
              <p className="card-title">Nombre: {datosDashboard[0]?.name}</p>
              <p className="card-title">
                username: @{datosDashboard[0]?.username}
              </p>
              <p className="card-title">email: {datosDashboard[0]?.email}</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"></li>
                <li className="list-group-item">
              
                    <Button variant="primary" size="sm" onClick={()=> navigate("/cargar_archivo", { state: datosDashboard })}>
                      Subir Archivo
                    </Button>
             
                </li>
                <li className="list-group-item">
                    <Button variant="primary" size="sm" onClick={()=>
                    navigate("/editar_archivo", { state: datosDashboard })}>
                      Editar Archivo
                    </Button>
              
                </li>
                <li className="list-group-item">
                  <Button variant="primary" size="sm">
                    ELiminar Archivo
                  </Button>
                </li>
                <li className="list-group-item">
                  <Link to={"/agregar_amigos"}>
                    <Button variant="primary" size="sm">
                      Agregar Amigo
                    </Button>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link to={"/ver_archivo"}>
                    <Button variant="primary" size="sm">
                      Ver Archivo
                    </Button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-sm-9" style={{ border: "1px solid black" }}>
          <div className="row ">
            <h3>Publico</h3>
            <hr />

            {archivoPublico.map((archivo) => (
              <div
                className="col-sm-4"
                style={{ textAling: "center" }}
                key={archivo.id}
              >
                <p>Nombre:</p>
                <p> {archivo.name}</p>
                <p>Propietario usuario:</p>
                <p> {archivo.owner}</p>

                <Button
                  variant="primary"
                  size="sm"
                  target="_blank"
                  href={archivo.s3_path}
                >
                  ver
                </Button>
              </div>
            ))}
          </div>
          <hr />
          <div className="row ">
            <h3>Privado</h3>
            {archivoPrivado.map((archivo) => (
              <div className="col-sm-4" key={archivo.id}>
                <p>Nombre:</p>
                <p> {archivo.name}</p>
                <p>Propietario usuario:</p>
                <p> {archivo.owner}</p>
                <Button
                  variant="primary"
                  size="sm"
                  target="_blank"
                  href={archivo.s3_path}
                >
                  ver
                </Button>
              </div>
            ))}
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
