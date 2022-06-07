import api from 'src/services/AxiosService';

const getAllNotification = (
  pageNumber: number,
  pageSize: number,
  email: any
) => {

  return new Promise((resolve, reject) => {
    api(
      'get',
      'lm-web',
      null,
      `/notificationbyemail/${email}/?page=${pageNumber}&size=${pageSize}`,
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
