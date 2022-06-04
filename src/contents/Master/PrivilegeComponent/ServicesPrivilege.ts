import api from "../../../services/AxiosService";

export const getAllPrivilages = () => {
    return new Promise((resolve, reject) => {
        api("GET", "lm-web", null, "/rolePermission/sign-in", "", "", "")
            .then((response: any) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const addPrivilages = (data) => {
    return new Promise((resolve, reject) => {
        api("POST", "lm-web", null, "/role-permission", "", data, "")
            .then((response: any) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
