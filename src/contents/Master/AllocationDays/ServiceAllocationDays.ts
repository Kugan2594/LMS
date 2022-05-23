import api from "src/services/AxiosService";

const getEmployeeleavetypeByEmployeeId = (employeeId: any) => {
  return new Promise((resolve, reject) => {
    api("get", "lm-web", null, `/employeeleavetype/employee/${employeeId}`, "", "", "")
      .then((response: any) => {
        resolve(response.data.result.getEmployeeleavetypeByEmployeeId);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getEmployeeleavetypeByEmployeeId };
