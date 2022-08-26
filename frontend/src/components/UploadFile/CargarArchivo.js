import React from "react";
import './estilo.css';

function CargarArchivo() {
    return(
        <div id="profile" class="container profile profile-view">
            <form>
                <div class="row profile-row">
                    <div class="col-md-4 relative">
                        <div class="avatar">
                            <div class="avatar-bg center"></div>
                        </div><input class="form-control" type="file" name="avatar-file" />
                    </div>
                    <div class="col-md-8">
                        <h1>Subir archivo</h1>
                        <hr />
                        <div class="row">
                            <div class="col-md-6 col-sm-12">
                                <div class="form-group"><label class="control-label">Nombre Archivo:</label><input class="form-control" type="text" name="firstname" /></div>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <div class="form-group"><label class="control-label">Archivo Seleccionado:</label><input class="form-control" type="text" name="lastname" /></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group"><label class="control-label">Tipo de archivo:</label>
                                    <div class="col-md-12">
                                        <div class="checkbox"><label class="control-label"><input type="checkbox" />Público</label></div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="checkbox"><label class="control-label"><input type="checkbox" />Privado</label></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-sm-12">
                                <div class="form-group"><label class="control-label">Contraseña</label><input class="form-control" type="password" name="password" autocomplete="off" required /></div>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-md-12 content-right"><button class="btn btn-primary form-btn" type="submit">Subir</button><button class="btn btn-danger form-btn" type="reset">Cancelar</button></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CargarArchivo;