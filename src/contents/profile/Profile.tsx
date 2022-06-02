import { EditOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Button, Col, Input, Row } from 'antd';
import React, { useState } from 'react'
import { changeUserPassword } from './ServiceUser';
// import { getPermissionStatus , getSubordinatePrivileges,sampleFuc} from "../../../utils/permissionUtils";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import CustomizedNotification from 'src/util/CustomizedNotification';


function ProfileScreen() {
 
//   const handleError = (res) => {
//     setalert({
//         type: NOTIFICATION_TYPE.error,
//         mesg: res.data.validationFailures[0].message,
//     });
// };
// const [alert, setalert] = useState({
//   type: "",
//   mesg: "",
// });
// const [open, setOpen] = useState(false);

// const reloadTable = (res) => {
//   console.log("ppppppppppppppppp", res);
//   setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });
//   setOpen(false);
// };
//  // console.log(" Designation ", Designation )
//  // console.log("Data", Designation.subordinatePrivileges)
//  //    console.log("  Designation 123", SubDesignation)
//     // console.log("  Profile.status",sampleFuc( UserSetting));
//   const updatePassword=(res)=>
//   {
//     console.log("rs",res);
//     let item={oldpassword,newpassword}
//     changeUserPassword(item)
//       .then(() => {
//         reloadTable(res);

//       })
//       .catch((err) => {
//         handleError(err);
//       });
//   }

//   return (
//     <React.Fragment>
//       <div
//         style={{
//           padding: 24,
//           background: "#fff",
//           minHeight: "500px",
//           boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
//           transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
//         }}
//       >
//         <Row gutter={10}>
//           <Col span={12}>
//             <form action="" style={{ width: "25em" }}>
//               <label>Verify Current Password</label>
//               <Input
//                 prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
//                 type="password"
//                 placeholder="Password"
//                 value={oldpassword} onChange={(e)=>{setOldPassword(e.target.value)}}
//               />
//               <br />
//               <br />
//               <label>New Password</label>
//               <span
//                 style={{
//                   marginLeft: "6.5em",
//                   textDecoration: "underline",
//                   color: "blue",
//                 }}
//               >
//                 {/* Generate Strong Password */}
//               </span>
//               <Input
//                 prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
//                 type="password"
//                 placeholder="Password"
//                 value={newpassword} onChange={(e)=>{setNewPassword(e.target.value)}}
//               />
//               {/* list items for password warnings 
//                               <Row gutter={2}>
//                                   <Col span={12}>
//                                       <div style={{ color: "#ff8246" }}><Icon type="warning" theme="filled" />One LowerCase Character</div>
//                                       <div style={{ color: "#ff8246" }}><Icon type="warning" theme="filled" />One UpperCase Character</div>
//                                       <div style={{ color: "#ff8246" }}><Icon type="warning" theme="filled" />One Number</div>
//                                   </Col>
//                                   <Col span={12}>
//                                       <div style={{ color: "#ff8246" }}><Icon type="warning" theme="filled" />One Special Character</div>
//                                       <div style={{ color: "#ff8246" }}><Icon type="warning" theme="filled" />8 Character Minimum</div>
//                                       <div style={{ color: "#ff8246" }}><Icon type="warning" theme="filled" />50 Character Maximum</div>
//                                   </Col>
//                               < /Row>*/}
//               <br />
//               <br />
//               {/* <label>Verify New Password</label>
//               <Input
//                 prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
//                 type="password"
//                 placeholder="Password"
//               /> */}
//             </form>
//             <br />
//             <div className="customBtn">
//               <Button onClick={updatePassword} icon={<EditOutlined/>}>
//                 Update
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </React.Fragment>
//   );



  const handleError = (res) => {
    setalert({
        type: NOTIFICATION_TYPE.error,
        mesg: res.data.validationFailures[0].message,
    });
};
const [alert, setalert] = useState({
  type: "",
  mesg: "",
});
const [open, setOpen] = useState(false);

  const onFinish = (values) => {
    let data = {
      newPassword: values.newPassword,
      oldPassword: values.oldPassword
    };
    changeUserPassword("", data)
        .then(() => {
            // passwordChangedSuccess();
        })
        .catch((err) => {
            // errHandler(err);
        });
  };

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
  const reloadTable = (res) => {
      setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });
      setOpen(false);
    };
     // console.log(" Designation ", Designation )
     // console.log("Data", Designation.subordinatePrivileges)
     //    console.log("  Designation 123", SubDesignation)
        // console.log("  Profile.status",sampleFuc( UserSetting));
};

return (
  <React.Fragment>
      <div
          style={{
              padding: 24,
              background: "#fff",
              minHeight: "500px",
              boxShadow:
                  "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
              transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
          }}
      >
          <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              style={{ width: 600 }}
          >
              <Form.Item
                  label="Current Password"
                  name="oldPassword"
                  rules={[
                      {
                          required: true,
                          message: "Please input your password!"
                      }
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
                          message: "Please input your password!"
                      },
                      // {
                      //     pattern: new RegExp(passwordRegex),
                      //     message:
                      //         "Enter strong password ( Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters )"
                      // }
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
                          message: "Please input your password!"
                      },
                      ({ getFieldValue }) => ({
                          validator(_, value) {
                              if (
                                  !value ||
                                  getFieldValue("newPassword") === value
                              ) {
                                  return Promise.resolve();
                              }

                              return Promise.reject(
                                  new Error(
                                      "The two passwords that you entered do not match!"
                                  )
                              );
                          }
                      })
                  ]}
              >
                  <Input.Password
                      placeholder="Verify New Password"
                      style={{ width: 350 }}
                  />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                      Update
                  </Button>
              </Form.Item>
          </Form>
      </div>
  </React.Fragment>
);

}

export default ProfileScreen;
