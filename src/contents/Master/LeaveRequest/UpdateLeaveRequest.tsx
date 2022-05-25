import { Card, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "src/components/atoms/controlls/Button";
import Input from "src/components/atoms/controlls/Input";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import {
  FORM_VALIDATION,
  spaceValidation,
  PHONE_VALIDATION,
  EMAIL_VALIDATION,
} from "src/util/ValidationMeassage";
import { ILeaveRequest } from "./LeaveRequest.interface";

import DatePicker from "src/components/atoms/controlls/DatePicker";
import {
  updateLeaveRequest,
  getAllEmployeesForDropDown,
  getAllLeaveTypeForDropDown,
} from "./ServiceLeaveRequest";
import AutocompleteSelect from "src/components/atoms/controlls/AutocompleteSelect";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Checkbox from "src/components/atoms/controlls/Checkbox";
import Select from "src/components/atoms/controlls/Select";
import moment from "moment";
import CustomizedNotification from "src/util/CustomizedNotification";
import { Container } from "@mui/system";

let initialFValues: ILeaveRequest = {
  id: 0,
  fromDate: "",
  toDate: "",
  reason: "",
  leaveDays: 0,
  employeeId: 0,
  leaveTypeId: 0,
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

function UpdateLeaveRequest(props) {
  const {
    reloadTable,
    action,
    editData,
    handleError,
    isButton,
    isButtonTwo,
    isButtonThree,
  } = props;
  const [leaveTypeData, setleaveTypeData] = useState([]);
  const [employeeData, setemployeeData] = useState([]);

  const validate = (fieldValues = values) => {
    let temp: ILeaveRequest = { ...errors };

    if ("fromDate" in fieldValues)
      temp.fromDate = fieldValues.date
        ? spaceValidation.test(fieldValues.date)
          ? ""
          : `Date ${FORM_VALIDATION.space}`
        : FORM_VALIDATION.required;

    if ("toDate" in fieldValues)
      temp.toDate = fieldValues.date
        ? spaceValidation.test(fieldValues.date)
          ? ""
          : `Date ${FORM_VALIDATION.space}`
        : FORM_VALIDATION.required;

    if ("employeeId" in fieldValues)
      temp.employeeId = fieldValues.employeeId ? "" : "This field is required.";

    if ("leaveTypeId" in fieldValues)
      temp.leaveTypeId = fieldValues.leaveTypeId
        ? ""
        : "This field is required.";
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
  const [updateStatus, setupdateStatus] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    const formData = new FormData();
    if (validate()) {
      let data: object = {
        leaveTypeId: values.leaveTypeId,
        employeeId: values.employeeId,
        leaveDays: values.leaveDays,
        reason: values.reason,
        toDate: values.toDate,
        fromDate: values.fromDate,
      };
      const formData = new FormData();
      formData.append("leaveTypeId", values.leaveTypeId);
      formData.append("employeeId", values.employeeId);
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

      updateLeaveRequest(data).then(
        (res: any) => {
          console.log(res);

          reloadTable(res);
          setupdateStatus(true);
          resetForm();
        },
        (error) => {
          console.log(error);
          handleError(error);
        }
      );
    }
  };
  useEffect(() => {
    getLeaveTypeSelectData();
    getEmployeeSelectData();
    if (action === "edit") {
      console.log({ editData });

      setValues(editData);
    }
  }, [action, editData, setValues]);

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

  const onChangeFormValue = () => {
    setupdateStatus(false);
  };
  const onReset = () => {
    resetForm();
  };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onValueChange = (e) => {
    setupdateStatus(false);
    const { name, value } = e.target;

    console.log("hit", name, value);
  };

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

  return (
    <div>
      <Box sx={{ width: "100%", justifyContent: "center" }}>
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Form onSubmit={handleSubmit} onChangeFormValue={onChangeFormValue}>
              <Grid container>
                <Grid item xs={4}>
                  <Select
                    name="employeeId"
                    label="Employee *"
                    value={values.employeeId}
                    onChange={handleInputChange}
                    error={errors.employee}
                    options={employeeData}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Select
                    name="leaveTypeId"
                    label="LeaveType *"
                    value={values.leaveTypeId}
                    onChange={handleInputChange}
                    onValueChange={onValueChange}
                    error={errors.leaveType}
                    options={leaveTypeData}
                  />
                </Grid>

                <Grid item xs={4}>
                  <DatePicker
                    name="fromDate"
                    label="From Date *"
                    value={values.fromDate}
                    onChange={handleInputChange}
                    error={errors.fromDate}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="reason"
                    label="Reason *"
                    value={values.reason}
                    onChange={handleInputChange}
                    error={errors.reason}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DatePicker
                    name="toDate"
                    label="To Date *"
                    value={values.toDate}
                    onChange={handleInputChange}
                    error={errors.toDate}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="leaveDays"
                    label="DAYS *"
                    value={values.leaveDays}
                    onChange={handleInputChange}
                    error={errors.leaveDays}
                    type="number"
                  />
                </Grid>

                <Divider />
                <Grid
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                  container
                  style={{ padding: "8px" }}
                ></Grid>
              </Grid>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button color="inherit" text="Back" />
                {action !== "edit" && (
                  <Button
                    size="small"
                    color="primary"
                    text="Reset"
                    onClick={onReset}
                  />
                )}
                <Button
                  size="small"
                  type="submit"
                  text={action === "edit" ? "Update" : "Submit"}
                  disabled={action === "edit" ? updateStatus : false}
                />
              </Box>
            </Form>
          </Typography>
        </React.Fragment>
      </Box>

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

UpdateLeaveRequest.propTypes = {
  reloadTable: PropTypes.func,
  handleError: PropTypes.func,
  action: PropTypes.string,
  editData: PropTypes.object,
};
export default UpdateLeaveRequest;
