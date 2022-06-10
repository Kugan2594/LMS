import { Card, Divider, Grid } from "@mui/material";
import { values } from "lodash";
import React, { useEffect, useState } from "react";
import Button from "src/components/atoms/controlls/Button";
import Input from "src/components/atoms/controlls/Input";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import { ILeaveType } from "./LeaveType.interface";
import Checkbox from "src/components/atoms/controlls/Checkbox";
import RadioGroup from "src/components/atoms/controlls/RadioGroup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import {
    createLeaveType,
    updateLeaveType,
    getLeaveDaysDurationSetting,
} from "./serviceLeaveType";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";

function AddLeaveType(props) {
    const {
        reloadTable,
        action,
        editData,
        handleError,
        handleClose,
        setLeaveDays,
    } = props;
    const [updateStatus, setupdateStatus] = useState(true);
    const [add, setAdd] = useState(false);
    const [inputFields, setInputFields] = useState([
        { startMonth: 0, endMonth: 0, days: 0 },
    ]);
    // const [leaveDays, setleaveDays] = useState({});
    const initialFValues: ILeaveType = {
        id: 0,
        description: "",
        type: "",
        noticePeriod: 0,
        cancellationNoticePeriod: 0,
        reginationNotified: false,
        ableToCarryForward: false,
        noticePeriodApplicable: false,
        monthlyApplicable: false,
        allocateDaysByAppointedDate: false,
        allocatedDaysByExtraWorking: false,
        minStretchDays: 0,
        maxStretchDays: 0,
        yearCompleted: false,
        noOfDaysPeryear: 0,
        noOfDays: 0,
        startMonth: 0,
        endMonth: 0,
        days: 0,
        carryforwardCancellation: 0,
        reminderGap: 0,
    };
    const validate = (fieldValues = values) => {
        let temp: ILeaveType = { ...errors };
        if ("type" in fieldValues)
            temp.type = fieldValues.type ? "" : "This field is required.";
        if ("description" in fieldValues)
            temp.description = fieldValues.description
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
    useEffect(() => {
        if (action === "edit") {
            console.log({ editData });
            setValues({ ...editData });
            // setInputFields(setLeaveDays);
            // console.log({setLeaveDays});
            getLeaveAllocated(editData.id);
        }
    }, [action, editData, setValues]);

    const getLeaveAllocated = (id: any) => {
        getLeaveDaysDurationSetting(id).then((res: any) => {
            let newfield = [];
            console.log({ res });
            res.data.map((leave) => {
                newfield.push(leave);
            });
            console.log({ newfield });
            setInputFields(newfield);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        if (validate()) {
            if (action === "add") {
                let data: object = {
                    allocateDaysByAppointedDate:
                        values.allocateDaysByAppointedDate,
                    description: values.description,
                    type: values.type,
                    noticePeriod: values.noticePeriod,
                    cancellationNoticePeriod: values.cancellationNoticePeriod,
                    reginationNotified: values.reginationNotified,
                    ableToCarryForward: values.ableToCarryForward,
                    noticePeriodApplicable: values.noticePeriodApplicable,
                    minStretchDays: values.minStretchDays,
                    maxStretchDays: values.maxStretchDays,
                    yearCompleted: values.yearCompleted,
                    noOfDaysPeryear: values.noOfDaysPeryear,
                    noOfDays: values.noOfDays,
                    leaveDaysDurationSettingDto: inputFields,
                    carryforwardCancellation: values.carryforwardCancellation,
                    days: values.days,
                    startMonth: values.startMonth,
                    endMonth: values.endMonth,
                    allocatedDaysByExtraWorking:
                        values.allocatedDaysByExtraWorking,
                    monthlyApplicable: values.monthlyApplicable,
                    carryForwardExpiry: values.carryForwardExpiry,
                    reminderGap: values.reminderGap,
                };
                console.log({ data });
                createLeaveType(data).then(
                    (res: any) => {
                        console.log(res);
                        reloadTable(res);
                        handleClose();
                        resetForm();
                    },
                    (error) => {
                        console.log(error);
                        // reloadTable(res);
                        handleClose();
                        handleError(error);
                    }
                );
            } else {
                let data: object = {
                    id: editData.id,
                    description: values.description,
                    type: values.type,
                    noticePeriod: values.noticePeriod,
                    cancellationNoticePeriod: values.cancellationNoticePeriod,
                    reginationNotified: values.reginationNotified,
                    ableToCarryForward: values.ableToCarryForward,
                    noticePeriodApplicable: values.noticePeriodApplicable,
                    minStretchDays: values.minStretchDays,
                    maxStretchDays: values.maxStretchDays,
                    yearCompleted: values.yearCompleted,
                    noOfDaysPeryear: values.noOfDaysPeryear,
                    noOfDays: values.noOfDays,
                    //  leaveDaysDurationSettingDto: values.leaveDaysDurationSettingDto
                    leaveDaysDurationSettingDto: inputFields,
                    allocateDaysByAppointedDate:
                        values.allocateDaysByAppointedDate,
                    carryforwardCancellation: values.carryforwardCancellation,
                    days: values.days,
                    startMonth: values.startMonth,
                    endMonth: values.endMonth,
                    allocatedDaysByExtraWorking:
                        values.allocatedDaysByExtraWorking,
                    monthlyApplicable: values.monthlyApplicable,
                    carryForwardExpiry: values.carryForwardExpiry,
                    reminderGap: values.reminderGap,
                };
                console.log({ data });
                updateLeaveType(data).then(
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
        }
    };
    const steps = ["Create New Leave Type", "Allocate Leave Days By Rules"];
    const [open, setOpen] = useState(false);

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    const onChangeFormValue = () => {
        setupdateStatus(false);
    };
    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };
    const handleNext = () => {
        if (validate()) {
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }
    };

    const onReset = () => {
        resetForm();
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    };

    const addFields = () => {
        let newfield = { startMonth: 0, endMonth: 0, days: 0 };

        setInputFields([...inputFields, newfield]);
    };

    const removeFields = (index) => {
        setupdateStatus(false);
        let data = [...inputFields];
        data.splice(index, 1);
        setInputFields(data);
    };
    const [option1, setOption1] = useState(true);
    const [option2, setOption2] = useState(true);

    const handleCheckBox1 = (e) => {
        setOption2(!option2);
        handleInputChange(e);
        console.log(option1);
    };

    const handleCheckBox2 = (e) => {
        setOption1(!option1);
        handleInputChange(e);
        console.log(option2);
    };

    return (
        <div>
            <Box sx={{ width: "100%", justifyContent: "center" }}>
                <Stepper
                    sx={{ background: "none", padding: 0 }}
                    activeStep={activeStep - 1}
                    alternativeLabel
                >
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};

                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length - 2 ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            <Form>
                                <Divider
                                    sx={{
                                        marginBottom: 2,
                                        marginTop: 2,
                                        fontSize: 12,
                                    }}
                                >
                                    Leave Types
                                </Divider>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Input
                                            name="type"
                                            label="Leave Type Name"
                                            value={values.type}
                                            onChange={handleInputChange}
                                            error={errors.type}
                                            tabIndex={0}
                                            inputProps={{ tabIndex: "1" }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Input
                                            name="description"
                                            label="Description"
                                            value={values.description}
                                            onChange={handleInputChange}
                                            error={errors.description}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Input
                                            name="noticePeriod"
                                            label="Notice Perios In Days"
                                            value={values.noticePeriod}
                                            onChange={handleInputChange}
                                            error={errors.noticePeriod}
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Input
                                            name="cancellationNoticePeriod"
                                            label="Cancellation Notice Period In Days"
                                            value={
                                                values.cancellationNoticePeriod
                                            }
                                            onChange={handleInputChange}
                                            error={
                                                errors.cancellationNoticePeriod
                                            }
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Input
                                            name="reminderGap"
                                            label="Reminder Gap"
                                            value={values.reminderGap}
                                            onChange={handleInputChange}
                                            error={errors.reminderGap}
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name="reginationNotified"
                                            label="Applicable in termination notice period"
                                            value={values.reginationNotified}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Checkbox
                                            name="ableToCarryForward"
                                            label="Carry Forward to next year"
                                            value={values.ableToCarryForward}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    {values.ableToCarryForward && (
                                        <Grid item xs={4}>
                                            <Checkbox
                                                name="carryForwardExpiry"
                                                label="Is Carry Forward Expired"
                                                value={
                                                    values.carryForwardExpiry
                                                }
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                    )}
                                    {values.ableToCarryForward &&
                                        values.carryForwardExpiry && (
                                            <Grid item xs={3}>
                                                <Input
                                                    name="carryforwardCancellation"
                                                    label="Carry Forward Cancellation Month"
                                                    value={
                                                        values.carryforwardCancellation
                                                    }
                                                    onChange={handleInputChange}
                                                    error={
                                                        errors.carryforwardCancellation
                                                    }
                                                    type="number"
                                                />
                                            </Grid>
                                        )}
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name="noticePeriodApplicable"
                                            label="Applicable Leave Days per request"
                                            value={
                                                values.noticePeriodApplicable
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    {values.noticePeriodApplicable && (
                                        <Grid item xs={3}>
                                            <Input
                                                name="minStretchDays"
                                                label="Minimum Days"
                                                value={values.minStretchDays}
                                                onChange={handleInputChange}
                                                error={errors.minStretchDays}
                                                type="number"
                                            />
                                        </Grid>
                                    )}
                                    {values.noticePeriodApplicable && (
                                        <Grid item xs={3}>
                                            <Input
                                                name="maxStretchDays"
                                                label="Maximum Days"
                                                value={values.maxStretchDays}
                                                onChange={handleInputChange}
                                                error={errors.maxStretchDays}
                                                type="number"
                                            />
                                        </Grid>
                                    )}
                                </Grid>
                                <Divider />
                                <Grid
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="flex-end"
                                    container
                                    style={{ padding: "8px" }}
                                ></Grid>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        pt: 2,
                                    }}
                                >
                                    <Box sx={{ flex: "auto 1 1 1" }} />
                                    <Button
                                        size="small"
                                        color="inherit"
                                        text="Cancel"
                                        onClick={handleClose}
                                    />
                                    <Box sx={{ flex: "1 1 auto" }} />
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        text="Back"
                                    />

                                    <Button onClick={handleNext} text="Next" />
                                </Box>
                            </Form>
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            <Form
                                onSubmit={handleSubmit}
                                onChangeFormValue={onChangeFormValue}
                            >
                                {" "}
                                <Grid container>
                                    {/* <Grid item xs={8}>
                                        <Checkbox
                                            name="allocatedDaysByExtraWorking"
                                            label="Allocate leave days by extra working hours"
                                            value={values.allocatedDaysByExtraWorking}
                                            onChange={handleInputChange}
                                        />
                                    </Grid> */}

                                    {/* <Grid item xs={8}>
                                    <FormControlLabel   name="allocatedDaysByExtraWorking"   onChange={handleInputChange}  value={values.allocatedDaysByExtraWorking} control={<Radio />} label="Allocate leave days by extra working hours" />
                                    </Grid> */}

                                    <Grid item xs={8}>
                                        <Checkbox
                                            name="yearCompleted"
                                            label="Allocated Leave Days Per Year"
                                            value={values.yearCompleted}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>

                                    {values.yearCompleted && (
                                        <Grid item xs={4}>
                                            <Input
                                                name="noOfDaysPeryear"
                                                label="Maximum Days"
                                                value={values.noOfDaysPeryear}
                                                onChange={handleInputChange}
                                                error={errors.noOfDaysPeryear}
                                                type="number"
                                            />
                                        </Grid>
                                    )}

                                    <Divider
                                        sx={{
                                            marginBottom: 2,
                                            marginTop: 2,
                                            fontSize: 12,
                                            color: "balck",
                                        }}
                                    >
                                        Leave allocation settings for newly
                                        appointed
                                    </Divider>
                                    <Card
                                        sx={{
                                            border: "1px #1a8cff solid",
                                            width: "650px",
                                            padding: "10px",
                                            boxShadow: "0 0 0",
                                        }}
                                    >
                                        {/* <Box sx={{ marginLeft: "30px" }}> */}
                                        <Grid container>
                                            <Grid item xs={0.5}></Grid>
                                            <Grid item xs={7.5}>
                                                {option1 ? (
                                                    <Checkbox
                                                        name="monthlyApplicable"
                                                        label="Allocate leave days by monthly earning"
                                                        value={
                                                            values.monthlyApplicable
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckBox1(e)
                                                        }
                                                    />
                                                ) : (
                                                    <Checkbox
                                                        name="monthlyApplicable"
                                                        label="Allocate leave days by monthly earning"
                                                        value={
                                                            values.monthlyApplicable
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        disabled
                                                    />
                                                )}
                                            </Grid>

                                            {values.monthlyApplicable && (
                                                <Grid item xs={4}>
                                                    <Input
                                                        name="noOfDays"
                                                        label="Maximum Days"
                                                        value={values.noOfDays}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        error={errors.noOfDays}
                                                        type="number"
                                                    />
                                                </Grid>
                                            )}
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={0.5}></Grid>
                                            <Grid item xs={11.5}>
                                                {option2 ? (
                                                    <Checkbox
                                                        name="allocateDaysByAppointedDate"
                                                        label="Allocate leave days by appointed date"
                                                        value={
                                                            values.allocateDaysByAppointedDate
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckBox2(e)
                                                        }
                                                    />
                                                ) : (
                                                    <Checkbox
                                                        name="allocateDaysByAppointedDate"
                                                        label="Allocate leave days by appointed date"
                                                        value={
                                                            values.allocateDaysByAppointedDate
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        disabled
                                                    />
                                                )}
                                            </Grid>

                                            {values.allocateDaysByAppointedDate &&
                                                inputFields.map(
                                                    (input, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <Grid
                                                                    container
                                                                    spacing={1}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        xs={4}
                                                                    >
                                                                        <FormLabel>
                                                                            {" "}
                                                                            Appointed
                                                                            month
                                                                            between
                                                                        </FormLabel>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={2}
                                                                    >
                                                                        <Input
                                                                            name="startMonth"
                                                                            label="From"
                                                                            value={
                                                                                input.startMonth
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                handleFormChange(
                                                                                    index,
                                                                                    event
                                                                                )
                                                                            }
                                                                            error={
                                                                                errors.startMonth
                                                                            }
                                                                            type="number"
                                                                        />
                                                                    </Grid>

                                                                    <Grid
                                                                        item
                                                                        xs={2}
                                                                    >
                                                                        <Input
                                                                            name="endMonth"
                                                                            label="to"
                                                                            value={
                                                                                input.endMonth
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                handleFormChange(
                                                                                    index,
                                                                                    event
                                                                                )
                                                                            }
                                                                            error={
                                                                                errors.endMonth
                                                                            }
                                                                            type="number"
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={2}
                                                                    >
                                                                        <Input
                                                                            name="days"
                                                                            box-sizing="border-box"
                                                                            label="Allocated Days"
                                                                            value={
                                                                                input.days
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                handleFormChange(
                                                                                    index,
                                                                                    event
                                                                                )
                                                                            }
                                                                            error={
                                                                                errors.days
                                                                            }
                                                                            type="number"
                                                                        />
                                                                    </Grid>

                                                                    <Grid
                                                                        item
                                                                        xs={2}
                                                                    >
                                                                        <Button
                                                                            text="Remove"
                                                                            variant="text"
                                                                            size="small"
                                                                            onClick={() =>
                                                                                removeFields(
                                                                                    index
                                                                                )
                                                                            }
                                                                            color="error"
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        );
                                                    }
                                                )}

                                            {values.allocateDaysByAppointedDate && (
                                                <Button
                                                    onClick={addFields}
                                                    text="Add More.."
                                                    size="small"
                                                />
                                            )}
                                            {/* </Box> */}
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        pt: 2,
                                    }}
                                >
                                    <Box sx={{ flex: "auto 1 1 1" }} />
                                    <Button
                                        size="small"
                                        color="inherit"
                                        text="Cancel"
                                        onClick={handleClose}
                                    />
                                    <Box sx={{ flex: "1 1 auto" }} />
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        text="Back"
                                    />
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
                                        text={
                                            action === "edit"
                                                ? "Update"
                                                : "Submit"
                                        }
                                        disabled={
                                            action === "edit"
                                                ? updateStatus
                                                : false
                                        }
                                    />
                                </Box>
                            </Form>
                        </Typography>
                    </React.Fragment>
                )}
            </Box>
        </div>
    );
}

export default AddLeaveType;
