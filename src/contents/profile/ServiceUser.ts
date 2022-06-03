import api from "src/services/AxiosService";

const changeUserPassword = (data: object) => {
  let body: object = {
    request: data,
  };
  return new Promise((resolve, reject) => {
    api("put", "th-web", null, `/changePassword`, "token", body, "")
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { changeUserPassword };
