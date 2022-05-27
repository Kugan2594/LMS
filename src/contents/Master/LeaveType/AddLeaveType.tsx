import { ButtonGroup, Divider, Grid, MobileStepper } from "@mui/material";
import { values } from "lodash";
import React, { useEffect, useState } from "react";
import Button from "src/components/atoms/controlls/Button";
import Input from "src/components/atoms/controlls/Input";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import { ILeaveType } from "./LeaveType.interface";
import Checkbox from "src/components/atoms/controlls/Checkbox";
import RadioGroup from "src/components/atoms/controlls/RadioGroup";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { createLeaveType, updateLeaveType } from "./serviceLeaveType";
import FormControlLabel from "@mui/material/FormControlLabel";
function AddLeaveType(props) {
  const { reloadTable, action, editData, handleError ,handleClose} = props;
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
  };

  const validate = (fieldValues = values) => {
    let temp: ILeaveType = { ...errors };
    if ("type" in fieldValues)
      temp.type = fieldValues.type ? "" : "This field is required.";
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
    console.log(values);
    if (validate()) {
      if (action === "add") {
        let data: object = {
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
          startMonth: values.startMonth,
          endMonth: values.endMonth,
          days: values.days,
        };
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
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const onChangeFormValue = () => {
    setupdateStatus(false);
  };
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

 
  const onReset = () => {
    resetForm();
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

  useEffect(() => {
    if (action === "edit") {
      console.log({ editData });
      setValues(editData);
    }
  }, [action, editData, setValues]);
  return (
    <div>
      <Box sx={{ width: "100%", justifyContent: "center" }}>
        {activeStep === steps.length - 2 ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              <Form>
                <Divider
                  sx={{
                    marginBottom: 2,
                    marginTop: 2,
                    fontSize: 12,
                    color: "gray",
                  }}
                >
                  Leave Types
                </Divider>
                <Grid container>
                  <Grid item xs={6}>
                    <Input
                      name="type"
                      label="Leave Type Name"
                      value={values.name}
                      onChange={handleInputChange}
                      error={errors.name}
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
                      label="Notice Perios"
                      value={values.noticePeriod}
                      onChange={handleInputChange}
                      error={errors.noticePeriod}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      name="cancellationNoticePeriod"
                      label="Cancellation Notice Period"
                      value={values.cancellationNoticePeriod}
                      onChange={handleInputChange}
                      error={errors.cancellationNoticePeriod}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Checkbox
                      name="reginationNotified"
                      label="Applicable in termination notice period"
                      value={values.reginationNotified}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Checkbox
                      name="ableToCarryForward"
                      label="Carry Forward to next year"
                      value={values.ableToCarryForward}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  {values.ableToCarryForward && (
                    <Grid item xs={6}>
                      <Input
                        name="cancellationNoticePeriod"
                        label="Carry Forward Cancellation Month"
                        value={values.cancellationNoticePeriod}
                        onChange={handleInputChange}
                        error={errors.cancellationNoticePeriod}
                        type="number"
                      />
                    </Grid>
                  )}
                  <Grid item xs={4}>
                    <Checkbox
                      name="noticePeriodApplicable"
                      label="Applicable Leave Days per request"
                      value={values.noticePeriodApplicable}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  {values.noticePeriodApplicable && (
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                <Grid
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                  container
                  style={{ padding: "8px" }}
                ></Grid>
                
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
                    Leave allocation settings for newly appointed
                  </Divider>
                  <Grid item xs={8}>
                    <Checkbox
                      name="monthlyApplicable"
                      label="Allocate leave days by monthly earning"
                      value={values.monthlyApplicable}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  {values.monthlyApplicable && (
                    <Grid item xs={4}>
                      <Input
                        name="noOfDays"
                        label="Maximum Days"
                        value={values.noOfDays}
                        onChange={handleInputChange}
                        error={errors.noOfDays}
                        type="number"
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Checkbox
                      name="allocateDaysByAppointedDate"
                      label="Allocate leave days by appointed date"
                      value={values.allocateDaysByAppointedDate}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  {values.allocateDaysByAppointedDate &&
                    inputFields.map((input, index) => {
                      return (
                        <div key={index}>
                          <Grid container>
                            <Grid item xs={3}>
                              <FormLabel> Appointed month between</FormLabel>
                            </Grid>
                            <Grid item xs={2}>
                              <FormLabel> from</FormLabel>
                              <Input
                                name="startMonth"
                                value={input.startMonth}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                                error={errors.startMonth}
                                type="number"
                              />
                            </Grid>

                            <Grid item xs={2}>
                              <FormLabel> to</FormLabel>
                              <Input
                                name="endMonth"
                                value={input.endMonth}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                                error={errors.endMonth}
                                type="number"
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <FormLabel> Allocated Days</FormLabel>
                              <Input
                                name="days"
                                value={input.days}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                                error={errors.days}
                                type="number"
                              />
                            </Grid>
                          </Grid>
                        </div>
                      );
                    })}
                </Grid>
                
              </Form>
              {values.allocateDaysByAppointedDate && (
                <Grid item xs={2}>
                  <button onClick={addFields}>Add More..</button>
                </Grid>
              )}
            </Typography>
          </React.Fragment>
        )}
        <Box sx={{ pt: 2 }}>
          <Box />
          <MobileStepper
            variant="dots"
            steps={2}
            position="static"
            activeStep={activeStep}
            sx={{backgroundColor: 'white'}}
            nextButton={
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                {action !== "edit" && (
                  <Button
                    size="small"
                    color="inherit"
                    text="Reset"
                    onClick={onReset}
                  />
                )}
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  color="inherit"
                  text="Back"
                />
                <Button
                  size="small"
                  text={
                    activeStep === steps.length - 1
                      ? action === "edit"
                        ? "Update"
                        : "Submit"
                      : "Next"
                  }
                  onClick={
                    activeStep === steps.length - 1 ? handleSubmit : handleNext
                  }
                  color="inherit"
                />
              </ButtonGroup>
            }
            backButton={
              <Button
                size="small"
                color="inherit"
                text="Cancel"
                onClick={handleClose}
              />
            }
          />
        </Box>
      </Box>
    </div>
  );
}
AddLeaveType.propTypes = {
    reloadTable: PropTypes.func,
    handleError: PropTypes.func,
    action: PropTypes.string,
    editData: PropTypes.object,
    handleClose: PropTypes.func
  };
export default AddLeaveType;
