import api from "src/services/AxiosService";

const getAllHoliday = (pageNumber: number, pageSize: number) => {
    return new Promise((resolve, reject) => {
        api(
            "get",
            "lm-web",
            null,
            `/holidayPagination?page=${pageNumber}&size=${pageSize}`,
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

const deleteHoliday = (id: number) => {
    return new Promise((resolve, reject) => {
        api("delete", "lm-web", null, "/holiday", "", "", id)
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
const updateHoliday = (data: object) => {
    return new Promise((resolve, reject) => {
        api("put", "lm-web", null, `/holiday`, "", data, "")
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const createHoliday = (data: object) => {
    return new Promise((resolve, reject) => {
        api("post", "lm-web", null, `/holiday`, "", data, "")
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
export { getAllHoliday, updateHoliday, deleteHoliday, createHoliday }