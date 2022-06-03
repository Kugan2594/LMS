import { getUserDetails } from 'src/contents/login/LoginAuthentication';
import api from 'src/services/AxiosService';

const getAllNotification = (id:number) => {
  let userData = getUserDetails();
  return new Promise((resolve, reject) => {
    api(
      'get',
      'lm-web',
      null,
      `/notificationById/${id}`,
      'token',
      '',
      ''
    )
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export { getAllNotification };