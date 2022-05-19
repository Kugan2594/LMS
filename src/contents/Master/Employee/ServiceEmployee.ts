import api from "src/services/AxiosService";

const deleteEmployee = (id: number) => {
    return new Promise((resolve, reject) => {
        api(
            "delete",
            "lm-web",
            null,
            "/leave-management/api/v1/employee",
            "",
            "",
            id
        )
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const getAllEmployee = (pageNumber: number, pageSize: number) => {
    return new Promise((resolve, reject) => {
        api(
            "get",
            "lm-web",
            null,
            `/leave-management/api/v1/employeePagination?page=${pageNumber}&size=${pageSize}`,
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

export { deleteEmployee, getAllEmployee };
