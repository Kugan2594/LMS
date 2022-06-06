import api from "../../services/AxiosService";
export const addItemApi = (data) => {
    return new Promise((resolve, reject) => {
        api("POST", "oauth-web", null, `/email/${data}`, "token", "", "")
            .then((response: any) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const resetPasswordApi = (data) => {
    return new Promise((resolve, reject) => {
        api("PUT", "oauth-web", null, "/userpasswordReset", "token", data, "")
            .then((response: any) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
