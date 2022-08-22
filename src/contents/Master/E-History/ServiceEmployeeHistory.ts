import api from "src/services/AxiosService";

const getAllEmployeeLeaveHistory = (
    pageNumber: number,
    pageSize: number,
    id: number
) => {
    return new Promise((resolve, reject) => {
        api(
            "get",
            "lm-web",
            null,
            `/approvalStatus/employee/${id}?page=${pageNumber}&size=${pageSize}`,
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

const getAllEmployeeLeaveHistoryByEmployee = (
    pageNumber: number,
    pageSize: number,
    id: number
) => {
    return new Promise((resolve, reject) => {
        api(
            "get",
            "lm-web",
            null,
            `/leaveHistory/${id}?page=${pageNumber}&size=${pageSize}`,
            "",
            "",
            ""
        )
            .then((response: any) => {
                resolve(response.any);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export { getAllEmployeeLeaveHistory, getAllEmployeeLeaveHistoryByEmployee };
