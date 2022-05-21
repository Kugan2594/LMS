import api from "src/services/AxiosService";

const getAllLeaveTypeForDropDown = () => {
    return new Promise((resolve, reject) => {
        api(
            "get",
            "lm-web",
            null,
            `/leaveType`,
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
        api(
            "get",
            "lm-web",
            null,
            `/employee`,
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

  const applyLeave = (data: object) => {
    let body: object = {
      request: data
    };
    return new Promise((resolve, reject) => {
      api(
        'post', 
        'lm-web', 
        null,
        `/leaveApply`,
        null, 
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

export { getAllLeaveTypeForDropDown, getAllEmployeesForDropDown,applyLeave};