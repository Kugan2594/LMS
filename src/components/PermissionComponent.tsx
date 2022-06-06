import React from 'react';

export default function PermissionComponent(props) {

let permissions=['CRUS'];
if(permissions.includes(props.permission)){
    return props.children
}
else{
    return null;
}

}
