const URL = "https://gentle-mails-bake-190-104-112-253.loca.lt";
export const URLBUCKETAWS="https://archivos-grupo5-p1.s3.us-east-2.amazonaws.com/seminario/"

export const login = "login";
export const registrar = "signup";
export const dashboard="home";
export const subirArchivos="addfile";

export const methodPOST = (peticion, data) => {
  return fetch(`${URL}/${peticion}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    });
};
