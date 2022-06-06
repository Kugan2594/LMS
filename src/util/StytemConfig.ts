const BASE_URL: string = "localhost";
const LM_WEB_PORT: number = 1309;
const OAUTH_PORT: number = 2803;
const WEB_SOCKET_PORT: number = 2109;

const LM_WEB_BASE_URL = `http://${BASE_URL}:${LM_WEB_PORT}/leave-management/api/v1`;
const OAUTH_BASE_URL = `http://${BASE_URL}:${OAUTH_PORT}/leave-management/api/v1`;
const LM_LOGIN_BASE_URL = `http://${BASE_URL}:${OAUTH_PORT}/leave-management`;
const EMAIL_VERIFICATION_LINK = `${window.location.origin}`;
const WEB_SOCKET_URL = `http://${BASE_URL}:${WEB_SOCKET_PORT}/ws`;
const oauthClient = {
    username: "client1",
    password: "123",
};

export const CLIENT_PORT: number = 3000;
export const CLIENT_BASE: string = "localhost";

export const SYSTEM_CONFIG = {
    baseUrl: LM_WEB_BASE_URL,
    loginBaseUrl: LM_LOGIN_BASE_URL,
    oauthClient: oauthClient,
    emailUrl: EMAIL_VERIFICATION_LINK,
    webSocketUrl: WEB_SOCKET_URL,
    oauthUrl: OAUTH_BASE_URL,
};
