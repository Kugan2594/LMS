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

const isUserRole = () => {
  let userData = localStorage.getItem('user');
  let user = JSON.parse(userData);

  return {
    isCompanyAdmin: user.isCompanyAdmin,
    isCompanyBranchAdmin: user.isCompanyBranchAdmin,
    companyId: user.companyId === null ? '' : user.companyId,
    companyBranchId: user.companyBranchId === null ? '' : user.companyBranchId,
    isTHAdmin: user.roleName === 'THADMIN' ? true : false,
    isSchool: user.companyType === 'SCHOOL' ? true : false
  };
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
  isUserRole,
  setUserName,
  getUserName
};
