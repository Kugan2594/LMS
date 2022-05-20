import api from "src/services/AxiosService";

const deleteEmployee = (id: number) => {
    return new Promise((resolve, reject) => {
        api("delete", "lm-web", null, "/employee", "", "", id)
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
            `/employeePagination?page=${pageNumber}&size=${pageSize}`,
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
const createEmployee = (data: object) => {
    return new Promise((resolve, reject) => {
        api("post", "lm-web", null, `/employee`, "", data, "")
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
const updateEmployee = (data: object) => {
    let body: object = {
        request: data,
    };
    return new Promise((resolve, reject) => {
        api("put", "lm-web", null, `/employee`, "", body, "")
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export { deleteEmployee, getAllEmployee, createEmployee, updateEmployee };