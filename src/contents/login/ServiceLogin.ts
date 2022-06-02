import api from 'src/services/AxiosService';
import { SYSTEM_CONFIG } from 'src/util/StytemConfig';
import { Buffer } from 'buffer';
const signIn = (data: any) => {
  let grant = {
    name: 'grant_type',
    type: 'password'
  };

  let token = Buffer.from(
    `${SYSTEM_CONFIG.oauthClient.username}:${SYSTEM_CONFIG.oauthClient.password}`,
    'utf8'
  ).toString('base64');

  var myHeaders = {
    Authorization: `Basic ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    originType: 'web'
  };

  let body: any = `${grant.name}=${grant.type}&username=${data.userName}&password=${data.password}`;

  return new Promise((resolve, reject) => {
    api('post', '', myHeaders, `/oauth/token`, 'token', body, '')
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const userVerification = (email: string, token: string) => {
  return new Promise((resolve, reject) => {
    api(
      'get',
      'th-login',
      null,
      `/api/v1/email-verification/email/${email}/token/${token}`,
      null,
      '',
      ''
    )
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export {
  signIn,
  userVerification,
};
