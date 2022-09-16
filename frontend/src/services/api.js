const URL = "https://pretty-bobcats-hug-190-104-112-253.loca.lt";

export const login = "login";
export const registrar = "signup";
export const dashboard="home";

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
