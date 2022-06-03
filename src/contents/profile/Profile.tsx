import { EditOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Button, Col, Input, Row, Divider } from "antd";
import React, { useState } from "react";
import { changeUserPassword } from "./ServiceUser";
// import { getPermissionStatus , getSubordinatePrivileges,sampleFuc} from "../../../utils/permissionUtils";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import CustomizedNotification from "src/util/CustomizedNotification";
import { passwordRegex } from "src/util/ValidationMeassage";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { useNavigate } from "react-router-dom";


function ProfileScreen() {
  let navigate = useNavigate();
  const handleError = (res) => {
    setalert({
      type: NOTIFICATION_TYPE.error,
      mesg: res.data.validationFailures[0].message,
    });
  };
  const reloadTable = (res) => {
    console.log("ppppppppppppppppp", res);
    setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });
    setOpen(false);
};
  const [alert, setalert] = useState({
    type: "",
    mesg: "",
  });
  const [open, setOpen] = useState(false);
  const logOut = () => {
    setTimeout(() => {
        navigate("/");
    }, 200);
};
const goDashBoard = (): void => {
  navigate("/master");
};

  const onFinish = (values) => {
    let data = {
      newPassword: values.newPassword,
      oldPassword: values.oldPassword,
    };
    changeUserPassword("", data)
      .then((res) => {
        reloadTable(res);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    const reloadTable = (res) => {
      setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });
      setOpen(false);
    };
  };

  return (
    
    <React.Fragment>
      <PageTitleWrapper>
        <PageTitle
          heading="Change Password"
          subHeading="Change Password"
          isButton={false}
        />
      </PageTitleWrapper>
      <Divider />
      <div
        style={{
          padding: 24,
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
         
        }}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          // style={{ width: 600 }}
        >
          <Form.Item
            label="Current Password"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Current Password"
              style={{ marginLeft: 20, width: 350 }}
            />
          </Form.Item>


          
          <br />
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                pattern: new RegExp(passwordRegex),
                message:
                  "Enter strong password ( Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters )",
              },
            ]}
          >
            <Input.Password
              placeholder="New Password"
              style={{ marginLeft: 38, width: 350 }}
            />
          </Form.Item>
          <br />
          <Form.Item
            label="Verify New Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Verify New Password"
              style={{ width: 350 }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={logOut}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
    
  );
}

export default ProfileScreen;
