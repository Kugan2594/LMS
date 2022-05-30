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

const getLeaveApproverStatus = (id:number) => {
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

export { updateApproverStatus , getLeaveApproverStatus};