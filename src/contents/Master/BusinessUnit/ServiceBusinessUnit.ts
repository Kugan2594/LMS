import api from "src/services/AxiosService";

const getAllBusinessUnit = (pageNumber: number, pageSize: number) => {
    return new Promise((resolve, reject) => {
        api(
            "get",
            "lm-web",
            null,
            `/designationPagination?page=${pageNumber}&size=${pageSize}`,
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

const deleteBusinessUnit = (id: number) => {
    return new Promise((resolve, reject) => {
        api("delete", "lm-web", null, "/designation", "", "", id)
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
const updateBusinessUnit = (data: object) => {
    return new Promise((resolve, reject) => {
        api("put", "lm-web", null, `/designation`, "", data, "")
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const createBusinessUnit = (data: object) => {
    return new Promise((resolve, reject) => {
        api("post", "lm-web", null, `/designation`, "", data, "")
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
export { getAllBusinessUnit, updateBusinessUnit, deleteBusinessUnit, createBusinessUnit }