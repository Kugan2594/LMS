import api from "src/services/AxiosService";

const getAllRole = (pageNumber: number, pageSize: number) => {
    return new Promise((resolve, reject) => {
        api(
            "get",
            "lm-web",
            null,
            `/rolePagination?page=${pageNumber}&size=${pageSize}`,
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

const getAllRoles = () => {
    return new Promise((resolve, reject) => {
        api("GET", "lm-web", null, "/role", "", "", "")
            .then((response: any) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const createRole = (data: object) => {
    return new Promise((resolve, reject) => {
        api("post", "lm-web", null, `/role`, "", data, "")
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const deleteRole = (id: number) => {
    return new Promise((resolve, reject) => {
        api("delete", "lm-web", null, "/role", "", "", id)
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const updateRole = (data: object) => {
    return new Promise((resolve, reject) => {
        api("put", "lm-web", null, `/role`, "", data, "")
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export { getAllRole, getAllRoles, updateRole, deleteRole, createRole };
