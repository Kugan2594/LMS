import React, { useEffect, useState } from "react";
import { ILeaveRequest } from "./LeaveRequest.interface";
import { FORM_VALIDATION, spaceValidation } from "src/util/ValidationMeassage";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import Input from "src/components/atoms/controlls/Input";
import { Divider, Grid } from "@mui/material";
import Button from "src/components/atoms/controlls/Button";
import DatePicker from "src/components/atoms/controlls/DatePicker";
import Select from "src/components/atoms/controlls/Select";
import { title } from "process";
import { Card, Container } from "@mui/material";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { number } from "prop-types";
import {
  applyLeave,
  getAllEmployeesForDropDown,
  getAllLeaveTypeForDropDown,
  getUserByEmail
} from "./ServiceLeaveRequest";
import moment from "moment";
import PropTypes from "prop-types";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import CustomizedNotification from "src/util/CustomizedNotification";
import { Box } from "@mui/system";
import {
  getUserDetails,
} from "../../login/LoginAuthentication";

let initialFValues: ILeaveRequest = {
  fromDate: "",
  toDate: "",
  reason: "",
  leaveDays: 0,
  isButton: true,
  isButtonTwo: true,
  isButtonThree: true,
  employeeId: 0,
  leaveTypeId: 0,
  id: 0,
  reloadTable: "",
};

const leaveType = [
  {
    id: 1,
    title: "CASUAL",
  },
  {
    id: 2,
    title: "ANNUAL",
  },
];

const employee = [
  {
    id: 1,
    title: "CUDESON",
  },
  {
    id: 2,
    title: "RUSHANTHAN",
  },
];

function LeaveRequestForm(props: ILeaveRequest) {
  const [leaveTypeData, setleaveTypeData] = useState([]);
  const [email, setEmail] = useState();
  const [employeeData, setemployeeData] = useState([]);
  const { isButton, isButtonTwo, isButtonThree, action, editData } = props;
  const [firstname, setFirstName] = useState("");
  const [employeeid, setEmployeeId] = useState();

  const validate = (fieldValues = values) => {
    let temp: ILeaveRequest = { ...errors };

    if ("fromDate" in fieldValues)
      temp.fromDate = fieldValues.fromDate
        ? spaceValidation.test(fieldValues.fromDate)
          ? ""
          : `fromDate ${FORM_VALIDATION.space}`
        : FORM_VALIDATION.required;

    if ("toDate" in fieldValues)
      temp.toDate = fieldValues.toDate
        ? spaceValidation.test(fieldValues.toDate)
          ? ""
          : `toDate ${FORM_VALIDATION.space}`
        : FORM_VALIDATION.required;

    if ("reason" in fieldValues)
      temp.reason = fieldValues.reason
        ? spaceValidation.test(fieldValues.reason)
          ? ""
          : `reason ${FORM_VALIDATION.space}`
        : FORM_VALIDATION.required;

    if ("leaveTypeId" in fieldValues)
      temp.leaveTypeId = fieldValues.leaveTypeId
        ? spaceValidation.test(fieldValues.date)
          ? ""
          : `leaveTypeId ${FORM_VALIDATION.space}`
        : FORM_VALIDATION.required;
    if ("leaveDays" in fieldValues)
      temp.leaveDays = fieldValues.leaveDays
        ? spaceValidation.test(fieldValues.date)
          ? ""
          : `leaveDays ${FORM_VALIDATION.space}`
        : FORM_VALIDATION.required;

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  }: any = useForm(initialFValues, true, validate);



  useEffect(() => {
    getLeaveTypeSelectData();
    let userData = getUserDetails();
    console.log({ userData });
    setEmail(userData.user_name);
    getEmployeeSelectData();
    getUserByUserMail(userData.user_name);
  }, [setValues]);

  const getLeaveTypeSelectData = () => {
    let data: any = [];
    getAllLeaveTypeForDropDown().then((res: []) => {
      res.map((post: any) => {
        data.push({ id: post.id, title: post.type });
        return null;
      });
      setleaveTypeData(data);
    });
  };
  const getUserByUserMail = (emailnew) => {
    getUserByEmail(emailnew).then((res: any) => {
      console.log("res.firstname", res.employee.firstName);
      setEmployeeId(res.employee.id);
      setFirstName(res.employee.firstName)
    });
  };
  const getEmployeeSelectData = () => {
    let data: any = [];
    getAllEmployeesForDropDown().then((res: []) => {
      res.map((post: any) => {
        data.push({ id: post.id, title: post.lastName });
        return null;
      });
      setemployeeData(data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data: object = {
      leaveTypeId: values.leaveTypeId,
      employeeId: employeeid,
      leaveDays: values.leaveDays,
      reason: values.reason,
      toDate: values.toDate,
      fromDate: values.fromDate,
    };
    const formData = new FormData();
    formData.append("leaveTypeId", values.leaveTypeId);
    formData.append("employeeId", employeeid);
    formData.append("leaveDays", values.leaveDays);
    formData.append("reason", values.reason);
    formData.append(
      "toDate",
      moment(values.toDate).format("YYYY-MM-DD HH:MM:SS.SSSS")
    );
    formData.append(
      "fromDate",
      moment(values.fromDate).format("YYYY-MM-DD HH:MM:SS.SSSS")
    );
    formData.append(
      "requestedDate",
      moment(values.requestedDate).format("YYYY-MM-DD HH:MM:SS.SSSS")
    );
    validate();

    applyLeave(formData).then(
      (res: any) => {
        reloadTable(res);
        resetForm();
        onReset();
      },
      (error) => {
        console.log(error);
        handleError(error);
      }
    );
  };

  const onChangeFormValue = () => { };
  const onReset = () => {
    resetForm();
  };
  const handleClickOpen = () => { };

  const handleAlertClose = () => {
    setalert({
      type: "",
      mesg: "",
    });
  };

  const [alert, setalert] = useState({
    type: "",
    mesg: "",
  });

  const handleError = (res) => {
    setalert({
      type: NOTIFICATION_TYPE.error,
      mesg: res.data.validationFailures[0].message,
    });
  };

  const reloadTable = (res) => {
    setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });
  };

  return (
    <div>

      <div>
        <Form onSubmit={handleSubmit} onChangeFormValue={onChangeFormValue}>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={6}>
          
                <DatePicker
                  name="fromDate"
                  label="From Date *"
                  value={values.fromDate}
                  onChange={handleInputChange}
                  error={errors.fromDate}
                />
                <Box sx={{ marginTop: 2.5 }}>
                  <Input
                    name="reason"
                    label="Reason *"
                    value={values.reason}
                    onChange={handleInputChange}
                    error={errors.reason}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Select
                  name="leaveTypeId"
                  label="Leave Type *"
                  value={values.leaveTypeId}
                  onChange={handleInputChange}
                  error={errors.leaveTypeId}
                  options={leaveTypeData}
                />

                <DatePicker
                  name="toDate"
                  label="To Date *"
                  value={values.toDate}
                  onChange={handleInputChange}
                  error={errors.toDate}
                /></Grid>
                  <Grid item xs={6}>
                <Box sx={{ marginTop: 0.5 }}>
                  <Input
                    name="leaveDays"
                    label="DAYS *"
                    value={values.leaveDays}
                    onChange={handleInputChange}
                    error={errors.leaveDays}
                    type="number"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>


          <div>
            <Box textAlign="right" marginBottom={2}>
              {isButton && (
                <Button
                  size="small"
                  text="Reset"
                  variant="outlined"
                  onClick={onReset}
                />
              )}

              {isButtonTwo && (
                <Button
                  onClick={() => {
                    console.log("clicked");
                  }}
                  size="small"
                  type="submit"
                  text="Apply"
                />
              )}
              {isButtonThree && (
                <Button
                  onClick={() => {
                    console.log("clicked");
                  }}
                  size="small"
                  type="submit"
                  text="Update"
                />
              )}
            </Box>
          </div>


        </Form>
      </div>
      {alert.type.length > 0 ? (
        <CustomizedNotification
          severity={alert.type}
          message={alert.mesg}
          handleAlertClose={handleAlertClose}
        />
      ) : null}

    </div>
  );
}
LeaveRequestForm.propTypes = {
  reloadTable: PropTypes.func,
  handleError: PropTypes.func,
  action: PropTypes.string,
  editData: PropTypes.object,
};

export default LeaveRequestForm;
