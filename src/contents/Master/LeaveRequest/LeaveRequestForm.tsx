import React, { useState } from "react";
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

let initialFValues: ILeaveRequest = {
    fromDate: "",
    toDate: "",
    reason: "",
    days: 0,
    isButton: true,
    isButtonTwo: true,
    isButtonThree: true,
};

function LeaveRequestForm(props: ILeaveRequest) {
    const { isButton, isButtonTwo, isButtonThree } = props;
    const validate = (fieldValues = values) => {
        let temp: ILeaveRequest = { ...errors };

        if ("fromDate" in fieldValues)
            temp.fromDate = fieldValues.date
                ? spaceValidation.test(fieldValues.date)
                    ? ""
                    : `Date ${FORM_VALIDATION.space}`
                : FORM_VALIDATION.required;

        setErrors({
            ...temp,
        });
        if ("toDate" in fieldValues)
            temp.toDate = fieldValues.date
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("values", validate(), values);
    };

    const onChangeFormValue = () => {};
    const onReset = () => {
        resetForm();
    };
    const handleClickOpen = () => {};

    return (
        <div>
            <br />
            <Container maxWidth="md">
                <Card>
                    <div>
                        <br />
                        <Divider />
                        <Form
                            onSubmit={handleSubmit}
                            onChangeFormValue={onChangeFormValue}
                        >
                            <Grid container>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={5} marginTop={5}>
                                    {" "}
                                    <Select
                                        name="employee"
                                        label="Employee *"
                                        value={values.employee}
                                        onChange={handleInputChange}
                                        error={errors.employee}
                                        options={[
                                            {
                                                id: "hjk",
                                                title: "hjasjsdh",
                                            },
                                        ]}
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
                                <Grid item xs={5} marginTop={5}>
                                    <Select
                                        name="leaveType"
                                        label="LeaveType *"
                                        value={values.leaveType}
                                        onChange={handleInputChange}
                                        error={errors.leaveType}
                                        options={[
                                            {
                                                id: "1",
                                                title: "Annual Leave",
                                            },
                                            {
                                                id: "2",
                                                title: "Casual Leave",
                                            },
                                            {
                                                id: "3",
                                                title: "Maternity Leave",
                                            },
                                        ]}
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

                                <Grid item xs={1}></Grid>
                            </Grid>

                            <Divider />
                            <Grid container>
                                <Grid item xs={4}></Grid>
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
                                <Grid item xs={4}></Grid>
                            </Grid>
                        </Form>
                    </div>
                </Card>
            </Container>
        </div>
    );
}

export default LeaveRequestForm;
