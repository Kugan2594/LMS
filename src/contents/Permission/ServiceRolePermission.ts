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



const getAllPermissionByRoleIdInLogin = (roleId) => {
    return new Promise((resolve, reject) => {
        api(
            'get',
            'lm-web',
            null,
            `/rolePermission`,
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
};

export {
    getAllPermissionByRoleIdInLogin,getRoleIdByRoleName
};