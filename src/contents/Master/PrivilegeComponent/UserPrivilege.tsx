import React, { useEffect, useState } from "react";
import { Button, Form, PageHeader, Tree, Select } from "antd";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";

const treeData = [
  {
    title: "Employees",
    key: "0-0",
    children: [
      {
        title: "Create Employee",
        key: "0-0-0",
        
      },
      {
        title: "Update Employee",
        key: "0-0-1",
        
      },
      {
        title: "View Employee",
        key: "0-0-2",
      },
      {
        title: "Delete Employee",
        key: "0-0-3",
      },
    ],
  },
  {
    title: "Approvers",
    key: "0-1",
    children: [
      {
        title: "Create Employee Approver",
        key: "0-1-0",
        
      },
      {
        title: "Update Employee Approver",
        key: "0-1-1",
        
      },
      {
        title: "View Employee Approver",
        key: "0-1-2",
      },
      {
        title: "Delete Employee Approver",
        key: "0-1-3",
      },
    ],
  },
  {
    title: "Leave Type",
    key: "0-2",
    children: [
      {
        title: "Create Leave Type",
        key: "0-2-0",
        
      },
      {
        title: "Update Leave Type",
        key: "0-2-1",
        
      },
      {
        title: "View Leave Type",
        key: "0-2-2",
      },
      {
        title: "Delete Leave Type",
        key: "0-2-3",
      },
    ],
  },
  {
    title: "Allocate Leaves",
    key: "0-3",
    children: [
      {
        title: "Create Employee Leave Type",
        key: "0-3-0",
        
      },
      {
        title: "Update Employee Leave Type",
        key: "0-3-1",
        
      },
      {
        title: "View Employee Leave Type",
        key: "0-3-2",
      },
      {
        title: "Delete Employee Leave Type",
        key: "0-3-3",
      },
    ],
  },
  {
    title: "Holidays",
    key: "0-4",
    children: [
      {
        title: "Create Holiday",
        key: "0-4-0",
        
      },
      {
        title: "Update Holiday",
        key: "0-4-1",
        
      },
      {
        title: "View Holiday",
        key: "0-4-2",
      },
      {
        title: "Delete Holiday",
        key: "0-4-3",
      },
    ],
  },
  {
    title: "Settings",
    key: "0-5",
    children: [
      {
        title: "Designations",
        key: "0-5-0",
        children: [
            {
              title: "Create Designation",
              key: "0-5-0-0",
              
            },
            {
              title: "Update Designation",
              key: "0-5-0-1",
              
            },
            {
              title: "View Designation",
              key: "0-5-0-2",
            },
            {
              title: "Delete Designation",
              key: "0-5-0-3",
            },
          ],
        
      },
      {
        title: "Type",
        key: "0-5-1",
        children: [
            {
              title: "Create Employment Type",
              key: "0-5-1-0",
              
            },
            {
              title: "Update Employment Type",
              key: "0-5-1-1",
              
            },
            {
              title: "View Employment Type",
              key: "0-5-1-2",
            },
            {
              title: "Delete Employment Type",
              key: "0-5-1-3",
            },
          ],
        
      },
      {
        title: "Location",
        key: "0-5-2",
        children: [
            {
              title: "Create Company Location",
              key: "0-5-2-0",
              
            },
            {
              title: "Update Company Location",
              key: "0-5-2-1",
              
            },
            {
              title: "View Company Location",
              key: "0-5-2-2",
            },
            {
              title: "Delete Company Location",
              key: "0-5-2-3",
            },
          ],
      },
      {
        title: "Unit",
        key: "0-5-3",
        children: [
            {
              title: "Create Buisness Unit",
              key: "0-5-3-0",
              
            },
            {
              title: "Update Buisness Unit",
              key: "0-5-3-1",
              
            },
            {
              title: "View Buisness Unit",
              key: "0-5-3-2",
            },
            {
              title: "Delete Buisness Unit",
              key: "0-5-3-3",
            },
          ],
      },
    ],
  },
  {
    title: "DashBoard",
    key: "0-6",
    children: [
      {
        title: "Create Leave Request",
        key: "0-6-0",
        
      },
      {
        title: "Update Leave Request",
        key: "0-6-1",
        
      },
      {
        title: "View Leave Request",
        key: "0-6-2",
      },
      {
        title: "Delete Leave Request",
        key: "0-6-3",
      },
    ],
  },
  
];

function UserPrivilage() {
  const [expandedKeys, setExpandedKeys] = useState(["0-0-0", "0-0-1"]);
  const [checkedKeys, setCheckedKeys] = useState(["0-0-0"]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <>
      <React.Fragment>
        <PageHeader title="User Role Privilege" />
        <div
          style={{
            padding: "0 24px 24px 24px",
            background: "#fff",
            minHeight: "500px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
          }}
        >
          <Form id="form" name="basic">
            <Form.Item>
              <Tree
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={treeData}
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
