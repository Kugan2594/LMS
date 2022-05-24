import api from "src/services/AxiosService";

const getAllEmployeeLeaveType = () => {
    return new Promise((resolve, reject) => {
        api("get", "lm-web", null, "/employeeleavetype", "", "", "")
            .then((response: any) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export { getAllEmployeeLeaveType };
