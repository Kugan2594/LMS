const BASE_URL: string = 'localhost';
const TH_WEB_PORT: number = 8082;
const WEB_SOCKET_PORT: number = 8081;

const TH_WEB_BASE_URL = `http://${BASE_URL}:${TH_WEB_PORT}/api/v1`;
const TH_LOGIN_BASE_URL = `http://${BASE_URL}:${TH_WEB_PORT}`;
const EMAIL_VERIFICATION_LINK = `${window.location.origin}`;
const WEB_SOCKET_URL = `http://${BASE_URL}:${WEB_SOCKET_PORT}/ws`;
const oauthClient = {
  username: 'client',
  password: '123'
};

export const CLIENT_PORT: number = 3000;
export const CLIENT_BASE: string = 'localhost';

export const SYSTEM_CONFIG = {
  baseUrl: TH_WEB_BASE_URL,
  loginBaseUrl: TH_LOGIN_BASE_URL,
  oauthClient: oauthClient,
  emailUrl: EMAIL_VERIFICATION_LINK,
  webSocketUrl: WEB_SOCKET_URL
};
