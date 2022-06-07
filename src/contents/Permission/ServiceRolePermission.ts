import api from 'src/services/AxiosService';
const getRoleIdByRoleName=(roleId)=>{
    return new Promise((resolve, reject) => {
        api(
            'get',
            'lm-web',
            null,
            `/roles`,
            'token',
            '',
            roleId
        )
            .then((response: any) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}



const getAllPermissionByRoleIdInLogin = () => {
    return new Promise((resolve, reject) => {
        api(
            'get',
            'lm-web',
            null,
            `/rolePermission/sign-in`,
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

export {
    getAllPermissionByRoleIdInLogin,getRoleIdByRoleName
};