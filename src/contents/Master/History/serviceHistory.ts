import api from 'src/services/AxiosService';
const updateApproverStatus = (data: object) => {
  return new Promise((resolve, reject) => {
    api("put", "lm-web", null, `/leaveRequestApproverStatus`, "", data, "")
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getLeaveApproverStatus = (id: number) => {
  return new Promise((resolve, reject) => {
    api(
      "get",
      "lm-web",
      null,
      `/approvalStatus/history?leaveRequestId=${id}`,
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

const getLeaveApproverStatusHistory = (pageNumber: number,
  pageSize: number) => {
  return new Promise((resolve, reject) => {
    api(
      "get",
      "lm-web",
      null,
      `/leaveHistory?page=${pageNumber}&size=${pageSize}`,
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


const getLeaveApproverStatusHistoryByEmployee = (pageNumber: number,
  pageSize: number, id: number) => {
  return new Promise((resolve, reject) => {
    api(
      "get",
      "lm-web",
      null,
      `/approvalStatus/approver/${id}?page=${pageNumber}&size=${pageSize}`,
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

const getEmployeeIdByEmail = (
  email: string
) => {
  return new Promise((resolve, reject) => {
    api(
      "get",
      "oauth-web",
      null,
      `/userbyemail`,
      "",
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


export { getEmployeeIdByEmail, updateApproverStatus, getLeaveApproverStatus, getLeaveApproverStatusHistory, getLeaveApproverStatusHistoryByEmployee };