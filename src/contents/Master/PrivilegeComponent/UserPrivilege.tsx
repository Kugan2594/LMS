import React, { useEffect, useState } from "react";
import { Button, Form, PageHeader, Select, Tree } from "antd";
import {
  addPrivilages,
  getAllPrivilages,
  getAllPrivilagesByRoleId,
} from "./ServicesPrivilege";
import "antd/dist/antd.css";
import { getAllRoles } from "../Roles/ServiceRoles";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import CustomizedNotification from "src/util/CustomizedNotification";
import { Divider } from "@mui/material";

function UserPrivilage() {
  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys]: any = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [roleNames, setRoleNames]: any = useState([]);
  const [roleId, setRoleId] = useState();
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [rolePermissionData, setRolePermissionData] = useState([]);
  const [alert, setalert] = useState({
    type: "",
    mesg: "",
  });

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

  function handleAlertClose() {
    setalert({
      type: "",
      mesg: "",
    });
  }

  function getAllRoleData() {
    getAllRoles()
      .then((data) => {
        setRoleNames(data);
      })
      .catch((err) => {});
  }

  function onFinish(values: any) {
    let finalRoleIds = [];
    let splitData = [];
    let userId = values.roleName;
    checkedKeys.map((post: any) => {
      splitData.push(post.split("-"));
    });

    splitData.map((post: any) => {
      if (post.length === 3) {
        finalRoleIds.push(post[2]);
      }
    });

    let data = { roleId: userId, permissionIds: finalRoleIds };
    addPrivilages(data)
      .then(() => {
        getRolePermissionData();
        setalert({
          type: NOTIFICATION_TYPE.success,
          mesg: "Successfully added privileges",
        });
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
            children: post.subordinatePrivileges.map((subPost: any) => {
              return {
                title: subPost.name,
                key: `${post.id}-${subPost.id}`,
                children: subPost.permissionDtos.map((finalPost: any) => {
                  return {
                    title: finalPost.description,
                    key: `${post.id}-${subPost.id}-${finalPost.id}`,
                    disableCheckbox:
                        finalPost.id===59
                        ? true
                        : false
                  };
                }),
              };
            }),
          });
        });
        setRolePermissionData(treeData);
      })
      .catch((err) => {});
  }

  function getRolePermissionDataByRoleId(id) {
    let treeData = [];
    getAllPrivilagesByRoleId(id)
      .then((res: any) => {
        res.results.Role_permission.map((post: any) => {
          treeData.push({
            title: post.name,
            key: post.id.toString(),
            children: post.subordinatePrivileges.map((subPost: any) => {
              return {
                title: subPost.name,
                key: `${post.id}-${subPost.id}`,
                children: subPost.permissionDtos.map((finalPost: any) => {
                  return {
                    title: finalPost.description,
                    key: `${post.id}-${subPost.id}-${finalPost.id}`,
                  };
                }),
              };
            }),
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
      })
      .catch((err) => {});
  }

  useEffect(() => {
    getAllRoleData();
    getRolePermissionData();
    getRolePermissionDataByRoleId(roleId);
  }, [roleId]);

  return (
    <>
      <React.Fragment>
        <PageHeader title="User Role Privilege" />
        <Divider />
        <br />
        <div
          style={{
            padding: "0 24px 24px 24px",
            background: "#fff",
            minHeight: "500px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
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
            <Form.Item name="roleName">
              <Select
                placeholder="Select Role"
                style={{
                  marginLeft: "76ch",
                  marginTop: "1ch",
                  width: 150,
                }}
                onChange={(value) => {
                  setRoleId(value);
                }}
                onSelect={(value) => getRolePermissionDataByRoleId(value)}
              >
                {roleNames.map((role, index) => {
                  return (
                    <Select.Option key={index} value={role.id}>
                      {role.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
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
          {alert.type.length > 0 ? (
            <CustomizedNotification
              severity={alert.type}
              message={alert.mesg}
              handleAlertClose={handleAlertClose}
            />
          ) : null}
        </div>
      </React.Fragment>
    </>
  );
}

export default UserPrivilage;
