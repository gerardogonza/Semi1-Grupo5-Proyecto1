
import './App.css';
import {
  BrowserRouter ,
  Route,Routes
} from "react-router-dom";
import Login from './components/Login/login';

import CargarArchivo from './components/UploadFile/CargarArchivo';

import AgregarAmigos from './components/AgregarAmigos/AgregarAmigos';
import VerArchivos from './components/VerArchivos/VerArchivos';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>} exact/>
      <Route path="/agregar_amigos" element={<AgregarAmigos/>} exact/>
      <Route path="/ver_archivos" element={<VerArchivos/>} exact/>
      <Route path="/cargar_archivo" element={<CargarArchivo/>} exact/>
    </Routes>
    </BrowserRouter>
    </div>
  );  
}

export default App;
