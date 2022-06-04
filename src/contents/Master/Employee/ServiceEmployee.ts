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
    return new Promise((resolve, reject) => {
        api("put", "lm-web", null, `/employee`, "", data, "")
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
const getAllCompanyLocationForDropDown = () => {
    return new Promise((resolve, reject) => {
        api(
            "get",
            "lm-web",
            null,
            `/companyLocation`,
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


const getAllDesignationForDropDown = () => {
    return new Promise((resolve, reject) => {
        api(
            "get",
            "lm-web",
            null,
            `/designation`,
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

const getAllBusinessUnitForDropDown = () => {
    return new Promise((resolve, reject) => {
        api(
            "get",
            "lm-web",
            null,
            `/businessUnit`,
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
const getAllEmployementTypeForDropDown = () => {
    return new Promise((resolve, reject) => {
        api(
            "get",
            "lm-web",
            null,
            `/employementType`,
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

const getAllRoleForDropDown = () => {
    return new Promise((resolve, reject) => {
        api(
            "get",
            "lm-web",
            null,
            `/role`,
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


export { deleteEmployee, getAllEmployee, createEmployee, updateEmployee, getAllDesignationForDropDown, getAllCompanyLocationForDropDown, getAllBusinessUnitForDropDown, getAllEmployementTypeForDropDown,getAllRoleForDropDown };
