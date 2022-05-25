import api from "src/services/AxiosService";

const getEmployeeleavetypeByEmployeeId = (employeeId: number) => {
  return new Promise((resolve, reject) => {
    api(
      "get",
      "lm-web",
      null,
      `/employeeleavetype/employee/${employeeId}`,
      "",
      "",
      ""
    )
      .then((response: any) => {
        resolve(response.data.results.getEmployeeleavetypeByEmployeeId);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllEmployeeLeaveType = () => {
  return new Promise((resolve, reject) => {
    api("get", "lm-web", null, `/employeeleavetype`, "", "", "")
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllEmployee = () => {
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

const createEmployeeLeaveType = (data: object) => {
  return new Promise((resolve, reject) => {
    api("post", "lm-web", null, `/employeeleavetype`, "", data, "")
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const updateEmployeeLeaveType = (data: object) => {
  return new Promise((resolve, reject) => {
    api("put", "lm-web", null, `/employeeleavetype`, "", data, "")
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllLeaveType = () => {
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
export {
  getEmployeeleavetypeByEmployeeId,
  getAllEmployeeLeaveType,
  getAllEmployee,
  createEmployeeLeaveType,
  updateEmployeeLeaveType,
  getAllLeaveType,
};
