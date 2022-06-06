export const setUserRolePermission = (permission) => {
    let permissionStr = JSON.stringify(permission);

    localStorage.setItem("permission", permissionStr);
};

export const getUserRolePermission = () => {
    let userPermission = localStorage.getItem("permission");
    return JSON.parse(userPermission);
};

var userPermissionData = getUserRolePermission();

export const getPermissionStatus = (moduleName) => {
    console.log("permision", userPermissionData);
    const result = userPermissionData
        ? userPermissionData.filter((per) => checkStatus(per, moduleName))[0]
        : {};
    result.status = isubordinatePrivilegTrue(
        result.subordinatePrivileges ? result.subordinatePrivileges : []
    );
    return result;
};

export const getPermissionStatusMain = (moduleName, userPermission) => {
    console.log("permision", userPermission);
    const result = userPermission
        ? userPermission.filter((per) => checkStatus(per, moduleName))[0]
        : {};
    result.status = isubordinatePrivilegTrue(
        result.subordinatePrivileges ? result.subordinatePrivileges : []
    );
    return result;
};

export const isubordinatePrivilegTrue = (subordinatePrivileges) => {
    return (
        subordinatePrivileges.filter((subordinate) => {
            return subordinate.status;
        }).length != 0
    );
};
export const getSubordinatePrivileges = (results, permissionName) => {
    const result = results.subordinatePrivileges.filter((per) =>
        checkStatus(per, permissionName)
    )[0].permissionDtos;
    //   console.log("Result",result)
    // console.log("Final Result",sampleFuc(result))
    return result;
};
export const sampleFuc = (permissionDtos) => {
    let data = {};
    permissionDtos.map((post) => {
        //console.log(`${post.name}-${post.status}`)
        data[post.name] = post.status;
    });

    return data;
};
function checkStatus(per, name) {
    return per.name === name;
}
