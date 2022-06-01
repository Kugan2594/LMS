import api from 'src/services/AxiosService';
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
    getAllPermissionByRoleIdInLogin
};