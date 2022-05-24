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

const allocateApprover = (data: object) => {
  let body: object = {
    request: data
  };
  return new Promise((resolve, reject) => {
    api(
      'post',
      'lm-web',
      null,
      `/employeeApprover`,
      'token',
      body,
      ''
    )
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const DeallocateApprover = (data: object) => {
  let body: object = {
    request: data
  };

  return new Promise((resolve, reject) => {
    api(
      'post',
      'th-web',
      null,
      `/`,
      'token',
      body,
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
export {

  getApprovers, allocateApprover, DeallocateApprover


};