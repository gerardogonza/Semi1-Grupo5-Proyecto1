import React, {useState,useEffect} from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from 'react-bootstrap';
import Barra from '../Barra'



const VerArchivos = () => {
    const [datatable, setDatatable] = useState({});

    

    useEffect(() => {
        const columns = [
            {
            label: 'Nombre documento',
            field: 'nombre',
            width: 150,
            attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Nombres',
            },
            },
            {
            label: 'Tipo de archivo',
            field: 'tipoarchivo',
            width: 200,
            },
            {
            label: 'Nombre del usuario',
            field: 'usuario',
            width: 200,
            },
            {
            label: 'Fecha',
            field: 'fecha',
            width: 200,
            },

            {
            label: 'Ver Archivo',
            field: 'ver',
            width: 200,
            },
        ]
        
        var formdata = new FormData();
        var requestOptions = {
            method: 'GET',
            data: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:9000/Documentos/documentos", requestOptions)
        .then(response => response.json())
        .then(result => {
                    var filas = result.map((e)=>{
                        if(e.estado !== ''){
                            return{...e,ver:<Button variant="warning" onClick={()=>{verarchivo(e)}}>
                                Ver
                            </Button>}
                        }else{
                            return false
                        }

                        
                })
            setDatatable({columns:columns,rows:filas})
        })
        .catch(error => console.log('error', error));

    },[])

    const verarchivo = (datatable) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var a = JSON.stringify({
            "docs": datatable
        });

        var requesOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: a,
            redirect: 'follow'
        };

        fetch("http://localhost:9000/Documentos/ver_archivo", requesOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        //alert('El documento ' + datatable.nombre + ' ha sido aceptado');
    }





    return (
        <div>
        <Barra/>
        <br></br>
            <br/><br/>
            <center>
                <h1 className="h1">Archivos de mis amigos</h1>                    
            </center>
            <br/><br/>

          
            <br/><br/>
            <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} searchTop searchBottom={false} />;
    

            

        </div>
    )
}



export default VerArchivos