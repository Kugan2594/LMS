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
} from "./ServiceLeaveRequest";
import moment from "moment";
import PropTypes from "prop-types";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import CustomizedNotification from "src/util/CustomizedNotification";

let initialFValues: ILeaveRequest = {
    fromDate: "",
    toDate: "",
    reason: "",
    days: 0,
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
    const [employeeData, setemployeeData] = useState([]);
    const { isButton, isButtonTwo, isButtonThree, action, editData } = props;
    const validate = (fieldValues = values) => {
        let temp: ILeaveRequest = { ...errors };

        if ("fromDate" in fieldValues)
            temp.fromDate = fieldValues.fromDate
                ? spaceValidation.test(fieldValues.date)
                    ? ""
                    : `Date ${FORM_VALIDATION.space}`
                : FORM_VALIDATION.required;

        if ("toDate" in fieldValues)
            temp.toDate = fieldValues.toDate
                ? spaceValidation.test(fieldValues.date)
                    ? ""
                    : `Date ${FORM_VALIDATION.space}`
                : FORM_VALIDATION.required;
        if ("employeeId" in fieldValues)
            temp.employeeId = fieldValues.employeeId
                ? spaceValidation.test(fieldValues.date)
                    ? ""
                    : `Date ${FORM_VALIDATION.space}`
                : FORM_VALIDATION.required;
        if ("reason" in fieldValues)
            temp.toDate = fieldValues.reason
                ? spaceValidation.test(fieldValues.date)
                    ? ""
                    : `Date ${FORM_VALIDATION.space}`
                : FORM_VALIDATION.required;
        if ("days" in fieldValues)
            temp.days = fieldValues.days
                ? spaceValidation.test(fieldValues.date)
                    ? ""
                    : `Date ${FORM_VALIDATION.space}`
                : FORM_VALIDATION.required;
        if ("leaveTypeId" in fieldValues)
            temp.leaveTypeId = fieldValues.leaveTypeId
                ? spaceValidation.test(fieldValues.date)
                    ? ""
                    : `Date ${FORM_VALIDATION.space}`
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
        getEmployeeSelectData();
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
            employeeId: values.employeeId,
            days: values.days,
            reason: values.reason,
            toDate: values.toDate,
            fromDate: values.fromDate,
        };
        const formData = new FormData();
        formData.append("leaveTypeId", values.leaveTypeId);
        formData.append("employeeId", values.employeeId);
        formData.append("leaveDays", values.days);
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

    const onChangeFormValue = () => {};
    const onReset = () => {
        resetForm();
    };
    const handleClickOpen = () => {};

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
            <br />
            <Container maxWidth="md">
                <Card>
                    <div>
                        <br />

                        <Form
                            onSubmit={handleSubmit}
                            onChangeFormValue={onChangeFormValue}
                        >
                            <Grid container>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={5}>
                                    {" "}
                                    <Select
                                        name="employeeId"
                                        label="Employee *"
                                        value={values.employeeId}
                                        onChange={handleInputChange}
                                        error={errors.employee}
                                        options={employeeData}
                                    />
                                    <DatePicker
                                        name="fromDate"
                                        label="From Date *"
                                        value={values.fromDate}
                                        onChange={handleInputChange}
                                        error={errors.fromDate}
                                    />
                                    <Input
                                        name="reason"
                                        label="Reason *"
                                        value={values.reason}
                                        onChange={handleInputChange}
                                        error={errors.reason}
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    <Select
                                        name="leaveTypeId"
                                        label="LeaveType *"
                                        value={values.leaveTypeId}
                                        onChange={handleInputChange}
                                        error={errors.leaveType}
                                        options={leaveTypeData}
                                    />

                                    <DatePicker
                                        name="toDate"
                                        label="To Date *"
                                        value={values.toDate}
                                        onChange={handleInputChange}
                                        error={errors.toDate}
                                    />
                                    <Input
                                        name="days"
                                        label="DAYS *"
                                        value={values.days}
                                        onChange={handleInputChange}
                                        error={errors.days}
                                        type="number"
                                    />
                                </Grid>
                            </Grid>

                            <Divider />
                            <Grid container>
                                <Grid item xs={6}></Grid>
                                <Grid
                                    item
                                    xs={4}
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="flex-end"
                                    container
                                    style={{ padding: "8px" }}
                                >
                                    <div>
                                        {isButton && (
                                            <Button
                                                size="small"
                                                text="Reset"
                                                color="info"
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
                                    </div>
                                </Grid>
                                <Grid item xs={2}></Grid>
                            </Grid>
                        </Form>
                    </div>
                </Card>
            </Container>
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
