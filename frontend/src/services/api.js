const URL = "https://good-areas-talk-34-224-166-22.loca.lt";
export const URLBUCKETAWS="https://archivos-grupo5-p1.s3.us-east-2.amazonaws.com/seminario/"

export const login = "login";
export const registrar = "signup";
export const dashboard="home";
export const subirArchivos="addfile";
export const editarArchivo="editfile";
export const eliminarArchivo="deletefile";

export const methodPOST = (peticion, data) => {
  return fetch(`${URL}/${peticion}`, {
    method: "POST",
    headers: { "Content-Type": "application/json","Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true  },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    });
};

export const methodDELETE = (peticion, data) => {
  return fetch(`${URL}/${peticion}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json","Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true  },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    });
};
