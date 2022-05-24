import api from "src/services/AxiosService";

const getAllLeaveTypeForDropDown = () => {
  return new Promise((resolve, reject) => {
    api("get", "lm-web", null, `/leaveType`, "", "", "")
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllEmployeesForDropDown = () => {
  return new Promise((resolve, reject) => {
    api("get", "lm-web", null, `/employee`, "", "", "")
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const applyLeave = (data: object) => {
  return new Promise((resolve, reject) => {
    api("post", "lm-web", null, `/leaveApply`, null, data, "")
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllLeaveRequest = (pageNumber: number, pageSize: number) => {
  return new Promise((resolve, reject) => {
    api(
      "get",
      "lm-web",
      null,
      `/leaveApplyPagination?page=${pageNumber}&size=${pageSize}`,
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
const updateLeaveRequest = (data: object) => {
  return new Promise((resolve, reject) => {
      api("put", "lm-web", null, `/leaveApply`, "", data, "")
          .then((response: any) => {
              resolve(response);
          })
          .catch((error) => {
              reject(error);
          });
  });
};

export {
  getAllLeaveTypeForDropDown,
  getAllEmployeesForDropDown,
  applyLeave,
  getAllLeaveRequest,
  updateLeaveRequest
};
