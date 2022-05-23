import api from "src/services/AxiosService";

const getEmployeeleavetypeByEmployeeId = (employeeId: number) => {
  return new Promise((resolve, reject) => {
    api("get", "lm-web", null, `/employeeleavetype/employee/${employeeId}`, "", "", "")
      .then((response: any) => {
        resolve(response.data.result.EmployeeLeaveType.length ? response.data.result.EmployeeLeaveType : []);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getEmployeeleavetypeByEmployeeId };
