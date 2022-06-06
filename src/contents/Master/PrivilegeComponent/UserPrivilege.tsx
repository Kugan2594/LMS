import React, { useEffect, useState } from "react";
import { Button, Form, PageHeader, Tree } from "antd";
import { addPrivilages, getAllPrivilages } from "./ServicesPrivilege";
import "antd/dist/antd.css";

function UserPrivilage() {
    const [form] = Form.useForm();
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState<any>([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [rolePermissionData, setRolePermissionData] = useState([]);

    const onExpand = (expandedKeysValue: any) => {
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue: any) => {
        console.log("onCheck", checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };

    const onSelect = (selectedKeysValue: any, info) => {
        setSelectedKeys(selectedKeysValue);
    };

    function onFinishFailed(errorInfo) {
        console.log("Failed:", errorInfo);
    }

    function onFinish(values: any) {
        let finalRoleIds = [];
        let splitData = [];
        let userId = values.roleName;
        checkedKeys.map((post: any) => {
            splitData.push(post.split("-"));
        });

        splitData.map((post: any) => {
            console.log("post");
            if (post.length === 3) {
                finalRoleIds.push(post[2]);
            }
        });

        let data = { roleId: userId, permissionIds: finalRoleIds };
        addPrivilages(data)
            .then(() => {
                getRolePermissionData();
            })
            .catch(() => {});
    }

    function getRolePermissionData() {
        let treeData = [];
        getAllPrivilages()
            .then((res: any) => {
                res.results.Permissions.map((post: any) => {
                    treeData.push({
                        title: post.name,
                        key: post.id.toString(),
                        children: post.subordinatePrivileges.map(
                            (subPost: any) => {
                                return {
                                    title: subPost.name,
                                    key: `${post.id}-${subPost.id}`,
                                    children: subPost.permissionDtos.map(
                                        (finalPost: any) => {
                                            return {
                                                title: finalPost.name,
                                                key: `${post.id}-${subPost.id}-${finalPost.id}`,
                                            };
                                        }
                                    ),
                                };
                            }
                        ),
                    });
                });
                let keys = [];

                treeData.map((post: any) =>
                    post.children.map((res: any) =>
                        res.children.map((data: any) => {
                            keys.push(data.key);
                        })
                    )
                );
                setCheckedKeys(keys);
                setRolePermissionData(treeData);
            })
            .catch((err) => {});
    }

    useEffect(() => {
        getRolePermissionData();
    }, []);

    return (
        <>
            <React.Fragment>
                <PageHeader title="User Role Privilege" />
                <div
                    style={{
                        padding: "0 24px 24px 24px",
                        background: "#fff",
                        minHeight: "500px",
                        boxShadow:
                            "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
                    }}
                >
                    <Form
                        id="form"
                        name="basic"
                        onFinish={onFinish}
                        form={form}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item>
                            <Tree
                                checkable
                                onExpand={onExpand}
                                expandedKeys={expandedKeys}
                                autoExpandParent={autoExpandParent}
                                onCheck={onCheck}
                                // value={checkedKeys}
                                checkedKeys={checkedKeys}
                                onSelect={onSelect}
                                selectedKeys={selectedKeys}
                                treeData={rolePermissionData}
                            />
                        </Form.Item>
                        <p>
                            <Button type="primary" htmlType="submit">
                                Set Privilages
                            </Button>
                        </p>
                    </Form>
                </div>
            </React.Fragment>
        </>
    );
}

export default UserPrivilage;
