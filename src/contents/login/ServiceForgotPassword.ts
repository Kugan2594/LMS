import api from "../../services/AxiosService";
export const addItemApi = (data) => {
    return new Promise((resolve, reject) => {
        api("POST", "oauth-web", null, `/email/${data}`, "", "", "")
            .then((response: any) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
