import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CargarArchivo from "./components/UploadFile/CargarArchivo";
import Dashboard from "./components/Dashboard/dashboard";
import Login from "./components/Login/login";
import AgregarAmigos from "./components/AgregarAmigos/AgregarAmigos";
import VerArchivos from "./components/VerArchivos/VerArchivos";
import EditarArchivo from "./components/EditarArchivo/EditarArchivo";
import Barra from "./components/Barra";
import Registrar from "./components/Registar/register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      
        <Routes>
          <Route path="/" element={<Login />} exact />    
          <Route path="/agregar_amigos" element={<div><Barra/> <AgregarAmigos /></div> } exact />
          <Route path="/dashboard" element={<div><Barra/> <Dashboard /></div> } exact />
          <Route path="/cargar_archivo" element={<div><Barra/> <CargarArchivo /></div> } exact />
          <Route path="/ver_archivo" element={<div><Barra/> <VerArchivos /></div> } exact />
          <Route path="/editar_archivo" element={<div><Barra/> <EditarArchivo/></div> } exact />
          <Route path="/registrar" element={<div> <Registrar/></div> } exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
