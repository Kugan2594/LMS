import api from "src/services/AxiosService";

// const changeUserPassword = (data: object) => {
//   // let body: object = {
//   //   request: data,
//   // };
//   return new Promise((resolve, reject) => {
//     api("put", "", null, `/api/v1/changePassword`, 'token', data, "")
//       .then((response: any) => {
//         resolve(response.data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

const changeUserPassword = (url, data) => {
  return new Promise((resolve, reject) => {
    api("put", "", null, `/api/v1/changePassword`, 'token', data, "")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { changeUserPassword };
