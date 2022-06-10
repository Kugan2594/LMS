import { getUserDetails } from "src/contents/login/LoginAuthentication";
import api from "src/services/AxiosService";

const getAllNotification = (pageNumber: number, pageSize: number) => {
    let userData = getUserDetails();
    return new Promise((resolve, reject) => {
        api(
            "GET",
            "lm-web",
            null,
            `/notificationByEmail/${userData.user_id}?page=${pageNumber}&size=${pageSize}`,
            "token",
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

const getNotification = (pageNumber: number, pageSize: number, email: any) => {
    return new Promise((resolve, reject) => {
        api(
            "GET",
            "lm-web",
            null,
            `/notificationbyemail/${email}/?page=${pageNumber}&size=${pageSize}`,
            "token",
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

export { getAllNotification, getNotification };
