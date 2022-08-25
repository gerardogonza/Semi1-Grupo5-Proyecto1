
import './App.css';
import {
  BrowserRouter ,
  Route,Routes
} from "react-router-dom";
import Login from './components/Login/login';


import AgregarAmigos from './components/AgregarAmigos/AgregarAmigos';


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
