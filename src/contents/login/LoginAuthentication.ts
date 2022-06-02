const setAuthentication = (value) => {
  localStorage.setItem('authenticate', value);
};

const getAuthentication = () => {
  return localStorage.getItem('authenticate') === 'true' ? true : false;
};
const setToken = (value) => {
  localStorage.setItem('token', value);
};
const getToken = () => {
  return localStorage.getItem('token');
};
const setUserDetails = (value) => {
  localStorage.setItem('user', value);
};
const getUserDetails = () => {
  let userData = localStorage.getItem('user');
  return JSON.parse(userData);
};

const setUserName = (value) => {
  localStorage.setItem('userName', value);
};
const getUserName = () => {
  let userData = localStorage.getItem('userName');
  return userData;
};


const setUserRolePermission = (permission) => {
  let permissionStr = JSON.stringify(permission);
  localStorage.setItem('permission', permissionStr);
};
const getUserRolePermission = () => {
  let userPermission = localStorage.getItem('permission');
  return JSON.parse(userPermission);
};
export {
  setAuthentication,
  getAuthentication,
  setToken,
  getToken,
  setUserDetails,
  getUserDetails,
  setUserRolePermission,
  getUserRolePermission,
  setUserName,
  getUserName
};
