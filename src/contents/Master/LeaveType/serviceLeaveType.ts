import api from "src/services/AxiosService";

const getAllLeaveType = (pageNumber: number, pageSize: number) => {
    return new Promise((resolve, reject) => {
        api(
            "get",
            "lm-web",
            null,
            `/leaveTypePagination?page=${pageNumber}&size=${pageSize}`,
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


const deleteLeaveType = (id: number) => {
    return new Promise((resolve, reject) => {
        api("delete", "lm-web", null, "/leaveType", "", "", "")
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const getGeneralSettingByLeaveType = (id: number) => {
    return new Promise((resolve, reject) => {
        api("get", "lm-web", null, "/generalsettingByLeaveType", "", "", id)
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const getAllGeneralSetting = () => {
    return new Promise((resolve, reject) => {
        api("get", "lm-web", null, "/stretchdays", "", "", "")
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};


const createLeaveType = (data: object) => {
    return new Promise((resolve, reject) => {
        api("post", "lm-web", null, `/leaveType`, "", data, "")
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
const updateLeaveType = (data: object) => {
    return new Promise((resolve, reject) => {
        api("put", "lm-web", null, `/leaveType`, "", data, "")
            .then((response: any) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
export { getAllLeaveType, deleteLeaveType, createLeaveType, updateLeaveType, getGeneralSettingByLeaveType, getAllGeneralSetting };
