
import './App.css';
import {
  BrowserRouter ,
  Route,Routes
} from "react-router-dom";
import CargarArchivo from './components/UploadFile/CargarArchivo';
import Dashboard from './components/Dashboard/dashboard';
import Login from './components/Login/Login';
import AgregarAmigos from './components/AgregarAmigos/AgregarAmigos';
import VerArchivos from './components/VerArchivos/VerArchivos';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>} exact/>
      <Route path="/agregar_amigos" element={<AgregarAmigos/>} exact/>
    </Routes>
    </BrowserRouter>
    </div>
  );  
}

export default App;
