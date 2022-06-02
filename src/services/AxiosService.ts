// import { getToken } from 'src/content/Login/LoginAuthentication';
// import { SYSTEM_CONFIG } from 'src/utils/StytemConfig';

import { SYSTEM_CONFIG } from "../util/StytemConfig";

const axios = require("axios").default;

function addParamsToURL(url: string, params: any) {
    if (params) {
        let temp = url;
        temp = temp + "/" + params;
        return temp;
    }
    return url;
}

const getHeaders = (token: string, adHeaders: object) => {
    if (token !== null) {
        return {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
                "Content-Type": "application/json",
                // Authorization: `Bearer ${getToken()}`,
                ...adHeaders,
            },
        };
    } else {
        return {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                ...adHeaders,
            },
        };
    }
};

export default function api(
    method: string,
    service: string,
    header: object | null,
    endPoint: string,
    token: string | null,
    body: any | null,
    params: any
) {
    let baseURL =
        service === "lm-web"
            ? SYSTEM_CONFIG.baseUrl
            : service === "oauth-web"
            ? SYSTEM_CONFIG.oauthUrl
            : SYSTEM_CONFIG.loginBaseUrl;
    let customURL = addParamsToURL(baseURL + endPoint, params);
    let headers = getHeaders("", header === null ? {} : header);

    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: customURL,
            data: body,
            headers: headers.headers,
        })
            .then(function (response: any) {
                resolve(response);
            })
            .catch(function (error: any) {
                reject(error.response);
            });
    });
}
