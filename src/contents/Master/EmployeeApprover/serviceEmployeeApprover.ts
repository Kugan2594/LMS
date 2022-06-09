import api from 'src/services/AxiosService';



const getApprovers = (pageNumber: number, pageSize: number) => {
  return new Promise((resolve, reject) => {
    api(
      'get',
      'lm-web',
      null,
      `/approver?page=${pageNumber}&size=${pageSize}`,
      'token',
      '',
      ''
    )
      .then((response: any) => {
        resolve(response.data.results.Approver);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const allocateApprover = (data: any) => {


  return new Promise((resolve, reject) => {
    api(
      'post',
      'lm-web',
      null,
      `/employeeapproverlist`,
      'token',
      data,
      ''
    )
      .then((response: any) => {
        console.log(response);
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const DeallocateApprover = (data: object) => {


  return new Promise((resolve, reject) => {
    api(
      'post',
      'lm-web',
      null,
      `/`,
      'token',
      data,
      ''
    )
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

}

const getAllEmployeeApprover = (pageNumber: number, pageSize: number) => {
  return new Promise((resolve, reject) => {
      api(
          "get",
          "lm-web",
          null,
          `/employeeApproverPagination?page=${pageNumber}&size=${pageSize}`,
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

const addEmployeeApprover = (data: object) => {
  return new Promise((resolve, reject) => {
    api("post", "lm-web", null, `/employeeapproverlist`, null, data, "")
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getEmployeeApproverByEmployeeId = (employeeId: number) => {
  return new Promise((resolve, reject) => {
    api(
      "get",
      "lm-web",
      null,
      `/employeeApprover/${employeeId}`,
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

export {

  getApprovers, allocateApprover, DeallocateApprover,getAllEmployeeApprover,getAllEmployeesForDropDown,addEmployeeApprover,getAllEmployee,getEmployeeApproverByEmployeeId


};