import api from "src/services/AxiosService";

const deleteCompanyLocation = (id: number) => {
  return new Promise((resolve, reject) => {
    api("delete", "lm-web", null, "/companyLocation", "", "", id)
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllCompanyLocation = (pageNumber: number, pageSize: number) => {
  return new Promise((resolve, reject) => {
      api(
          "get",
          "lm-web",
          null,
          `/companyLocationPagination?page=${pageNumber}&size=${pageSize}`,
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

const createCompanyLocation = (data: object) => {
  return new Promise((resolve, reject) => {
      api("post", "lm-web", null, `/companyLocation`, "", data, "")
          .then((response: any) => {
              resolve(response);
          })
          .catch((error) => {
              reject(error);
          });
  });
};
const updateCompanyLocation = (data: object) => {
  return new Promise((resolve, reject) => {
      api("put", "lm-web", null, `/companyLocation`, "", data, "")
          .then((response: any) => {
              resolve(response);
          })
          .catch((error) => {
              reject(error);
          });
  });
};

export { deleteCompanyLocation, getAllCompanyLocation,createCompanyLocation,updateCompanyLocation };
