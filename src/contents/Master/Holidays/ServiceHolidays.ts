import api from "src/services/AxiosService";

const getAllHolidays = (pageNumber: number, pageSize: number) => {
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

const deleteHolidays = (id: number) => {
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
const updateHolidays = (data: object) => {
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

const createHolidays = (data: object) => {
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
export { getAllHolidays, updateHolidays, deleteHolidays, createHolidays }