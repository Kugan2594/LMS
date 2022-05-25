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

const getLeaveApproverStatus = () => {
    return new Promise((resolve, reject) => {
        api(
          "get",
          "lm-web",
          null,
          `/approvalStatus?employeeId=2&leaveRequestId=3`,
          "",
          "",
          ""
        )
  
        .then((response: any) => {
          resolve(response.results.ApprovalLeaveHistory);
      })
      .catch((error) => {
          reject(error);
      });
    });
  };

export { updateApproverStatus , getLeaveApproverStatus};