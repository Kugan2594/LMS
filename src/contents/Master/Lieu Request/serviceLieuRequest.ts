import api from "src/services/AxiosService";

const getAllLieuRequest = () => {
  return new Promise((resolve, reject) => {
    api("get", "lm-web", null, `/lieuLeave`, "", "", "")
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const createLieuRequest = (data: object) => {
  return new Promise((resolve, reject) => {
      api("post", "lm-web", null, `/lieuLeave`, "", data, "")
          .then((response: any) => {
              resolve(response);
          })
          .catch((error) => {
              reject(error);
          });
  });
};
const updateLieuRequest = (data: object) => {
  return new Promise((resolve, reject) => {
      api("put", "lm-web", null, `/lieuLeave`, "", data, "")
          .then((response: any) => {
              resolve(response);
          })
          .catch((error) => {
              reject(error);
          });
  });
};

export { getAllLieuRequest ,createLieuRequest ,updateLieuRequest  };
