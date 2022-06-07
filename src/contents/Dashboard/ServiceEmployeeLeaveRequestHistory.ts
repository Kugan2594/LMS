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
            `/approvalStatus/employee/3?page=${pageNumber}&size=${pageSize}`,
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

const getEmployeeIdByEmail= (
email:string
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

const getApprovalStatusById= (
  id:number
    ) => {
        return new Promise((resolve, reject) => {
            api(
                "get",
                "lm-web",
                null,
                `/employee/${id}`,
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

export { getAllEmployeeLeaveRequestHistory ,getEmployeeIdByEmail,getApprovalStatusById};
