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
    api("post", "lm-web", null, `/leaveApply`,   'token', data, "")
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
      'token',
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
    api("put", "lm-web", null, `/leaveApply`,   'token', data, "")
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const cancelLeaveRequest = (id: number) => {
  return new Promise((resolve, reject) => {
    api("delete", "lm-web", null, "/leaveApply", "", "", id)
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const getUserByEmail= (email:string) => {
  return new Promise((resolve, reject) => {
    api(
      "get",
      "oauth-web",
      null,
      `/userbyemail`,
      'token',
      "",
      email
    )
      .then((response: any) => {
        resolve(response.data);
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
  updateLeaveRequest,
  cancelLeaveRequest,
  getUserByEmail
};
