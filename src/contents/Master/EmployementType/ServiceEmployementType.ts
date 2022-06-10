import api from "src/services/AxiosService";

const deleteEmployementType = (id: number) => {
  return new Promise((resolve, reject) => {
    api("delete", "lm-web", null, "/employementType", "", "", id)
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllEmployementType = (pageNumber: number, pageSize: number) => {
  return new Promise((resolve, reject) => {
    api(
      "get",
      "lm-web",
      null,
      `/employementTypePagination?page=${pageNumber}&size=${pageSize}`,
      "",
      "",
      ""
    )
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const createEmployementType = (data: object) => {
  return new Promise((resolve, reject) => {
    api("post", "lm-web", null, `/employementType`, "", data, "")
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const updateEmployementType = (data: object) => {
  return new Promise((resolve, reject) => {
    api("put", "lm-web", null, `/employementType`, "", data, "")
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export {
  deleteEmployementType,
  getAllEmployementType,
  createEmployementType,
  updateEmployementType,
};
