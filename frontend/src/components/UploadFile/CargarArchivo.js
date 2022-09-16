
import swal from "sweetalert";
import { methodPOST, subirArchivos,URLBUCKETAWS } from "../../services/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AWS from 'aws-sdk'

const S3_BUCKET ='archivos-grupo5-p1/seminario';
const REGION ='us-east-2';

AWS.config.update({
    accessKeyId: 'AKIAS73YTZZY2AHKDFN3',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

function CargarArchivo() {
  const location = useLocation();
  let navigate = useNavigate();



  const [datosDashboard, setDatosDashboard] = useState(location.state);
  const [files, setFile] = useState({
    owner: "emivnajera",
    name: "",
    type: "",
    s3_path: "",
  });

//   const convertBase64 = (file) => {
    // Array.from(file).forEach((file) => {
    //   const reader = new FileReader();
    //   //   console.log(file.name);
    //   reader.readAsDataURL(file);
    //   reader.onload = function () {
    //     var arrayAuxiliar = [];
    //     var base64 = reader.result;
    //     // console.log(base64);
    //     arrayAuxiliar = base64.split(",");
    //     // console.log(arrayAuxiliar[1]);
    //     setFile({
    //       owner: files.owner,
    //       name: files.name,
    //       type: files.type,
    //       s3_path: arrayAuxiliar[1],
    //     });
    //   };
    // });
//   };
const [progress , setProgress] = useState(0);
const [selectedFile, setSelectedFile] = useState(null);
const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
}

const uploadFile = (file) => {
    files.s3_path=URLBUCKETAWS+file.name;
    files.name = file.name;
    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name
    };


    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err) => {
            if (err) console.log(err)
        })
}

const subirArchivo = async () => {
    uploadFile(selectedFile)
    console.log(files)
      if (
          files.owner !== "" &&
          files.name !== "" &&
          files.type !== "" &&
          files.s3_path !== ""
          ) {
    const respuest= await methodPOST(subirArchivos, files);
    console.log(respuest);
     console.log(files)
     navigate("/dashboard", { state: datosDashboard })
    } else {
      swal("Incomplete data", "Please fill in all the fields!", "error");
    }
  };
  return (
    <div id="profile" class="container profile profile-view">
      <div>
        <div class="row profile-row">
          <div class="col-md-4 relative">
            <div class="avatar">
              <div class="avatar-bg center"></div>
            </div>
          </div>
          <div class="col-md-8">
            <h1>Subir archivo</h1>
            <hr />
            <div class="row">
              <div class="col-md-6 col-sm-12">
                {/* <div class="form-group">
                  <label class="control-label">Nombre Archivo:</label>
                  <input
                    class="form-control"
                    type="text"
                    name="firstname"
                    onChange={(e) => {
                      files.name = e.target.value;
                    }}
                  />
                </div> */}
              </div>
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label class="control-label">Archivo Seleccionado:</label>
                  <input
                    class="form-control"
                    type="file"
                    name="avatar-file"
                    onChange={handleFileInput}
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="control-label">Tipo de archivo:</label>
                  <div class="col-md-12">
                    <div class="checkbox">
                      <label class="control-label">
                        <input
                          type="checkbox"
                          onChange={() => (files.type = "public")}
                        />
                        Público
                      </label>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="checkbox">
                      <label class="control-label">
                        <input
                          type="checkbox"
                          onChange={() => (files.type = "private")}
                        />
                        Privado
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-sm-12">
                {/* <div class="form-group">
                  <label class="control-label">Contraseña</label>
                  <input
                    class="form-control"
                    type="password"
                    name="password"
                    autocomplete="off"
                    required
                  />
                </div> */}
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-12 content-right">
                <button class="btn btn-primary" onClick={() =>  subirArchivo()}>
                  Subir
                </button> 
                <button class="btn btn-danger form-btn" type="reset" onClick={()=>   navigate("/dashboard", { state: datosDashboard })}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CargarArchivo;
