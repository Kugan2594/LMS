import api from "src/services/AxiosService";

const getAllEmployeeLeaveRequestHistory = (
    pageNumber: number,
    pageSize: number
) => {
    return new Promise((resolve, reject) => {
        api(
            "get",
            "lm-web",
            null,
            `/approvalStatus/employee/2?page=${pageNumber}&size=${pageSize}`,
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

export { getAllEmployeeLeaveRequestHistory };
