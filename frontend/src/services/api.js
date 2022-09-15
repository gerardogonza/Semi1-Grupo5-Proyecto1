const URL = "http://localhost:8000";

export const login = "login";

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
