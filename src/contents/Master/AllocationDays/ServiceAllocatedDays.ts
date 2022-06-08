import api from "src/services/AxiosService";

const getAllEmployeeLeaveType = (id:number) => {
    return new Promise((resolve, reject) => {
        api("get", "lm-web", null, "/employeeleavetype/employee", "", "", id)
            .then((response: any) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export { getAllEmployeeLeaveType };
