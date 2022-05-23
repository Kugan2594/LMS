import { Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "src/components/atoms/controlls/Button";
import Input from "src/components/atoms/controlls/Input";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import {
  FORM_VALIDATION,
  spaceValidation,
  PHONE_VALIDATION,
  EMAIL_VALIDATION,
} from "src/util/ValidationMeassage";
import { IEmployee } from "./Employee.interface";
import Select from "@mui/material/Select";
import DatePicker from "src/components/atoms/controlls/DatePicker";
import { createEmployee, updateEmployee } from "./ServiceEmployee";
import AutocompleteSelect from "src/components/atoms/controlls/AutocompleteSelect";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

let initialFValues: IEmployee = {
  id: 0,
  firstName: "",
  address: "",
  lastName: "",
  email: "",
  gender: "",
  contactNo: "",
  maritalStatus: "",
  nationality: "",
  religon: "",
  passportNo: "",
  drivingLicenceNo: "",
  bloodGroup: "",
  description: "",
  joinDate: "",
  dateOfBirth: "",
  companyLocation: "",
  name: "",
  employmentType: "",
  businessUnit: "",
};
const genderType = [
  {
    id: "FEMALE",
    title: "FEMALE",
  },
  {
    id: "MALE",
    title: "MALE",
  },
];
const nationalityType = [
  {
    id: "FEMALE",
    title: "FEMALE",
  },
  {
    id: "MALE",
    title: "MALE",
  },
];
const designationtype = [
  {
    id: "SE",
    title: "SE",
  },
  {
    id: "QA",
    title: "QA",
  },
];
const employeementtype = [
  {
    id: "SE",
    title: "SE",
  },
  {
    id: "QA",
    title: "QA",
  },
];

function AddEmployee(props) {
  const { reloadTable, action, editData, handleError } = props;
  const validate = (fieldValues = values) => {
    let temp: IEmployee = { ...errors };

    if ("firstname" in fieldValues)
      temp.firstName = fieldValues.firstName
        ? spaceValidation.test(fieldValues.firstName)
          ? ""
          : `FirstName ${FORM_VALIDATION.space}`
        : FORM_VALIDATION.required;

    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName
        ? spaceValidation.test(fieldValues.lastName)
          ? ""
          : `LastName ${FORM_VALIDATION.space}`
        : FORM_VALIDATION.required;

    if ("maritalStatus" in fieldValues)
      temp.maritalStatus = fieldValues.maritalStatus
        ? spaceValidation.test(fieldValues.maritalStatus)
          ? ""
          : `MaritalStatus ${FORM_VALIDATION.space}`
        : FORM_VALIDATION.required;

    if ("contactNo" in fieldValues)
      temp.contactNo = fieldValues.contactNo
        ? PHONE_VALIDATION.test(fieldValues.contactNo)
          ? ""
          : `ContactNo ${FORM_VALIDATION.phoneNumber}`
        : FORM_VALIDATION.required;
    if ("email" in fieldValues)
      temp.email = EMAIL_VALIDATION.test(fieldValues.email)
        ? ""
        : FORM_VALIDATION.email;
    if ("address" in fieldValues)
      temp.address =
        fieldValues.address.length !== 0
          ? spaceValidation.test(fieldValues.address)
            ? ""
            : `Address ${FORM_VALIDATION.space}`
          : FORM_VALIDATION.required;

    if ("joinDate" in fieldValues)
      temp.joinDate = fieldValues.joinDate ? "" : "This field is required.";
    if ("dateOfBirth" in fieldValues)
      temp.dateOfBirth = fieldValues.dateOfBirth
        ? ""
        : "This field is required.";
    if ("companyLocation" in fieldValues)
      temp.companyLocation = fieldValues.companyLocation
        ? ""
        : "This field is required.";
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";

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
    console.log("values", values);
  };

  const onChangeFormValue = () => {};
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

  const steps = ["Personal Details", "Employement Details"];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <Box sx={{ width: "100%" ,justifyContent: 'center'}}>
        <Stepper sx={{  }} activeStep={activeStep}>
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
        {activeStep === steps.length - 1 ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              <Form
                onSubmit={handleSubmit}
                onChangeFormValue={onChangeFormValue}
              >
                <Grid container>
                  <Grid item xs={4}>
                    <DatePicker
                      name="joinDate"
                      label="Appointed Date *"
                      value={values.joinDate}
                      onChange={handleInputChange}
                      error={errors.joinDate}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <DatePicker
                      name="dateOfPermanency"
                      label="Date of Permanency *"
                      value={values.dateOfPermanency}
                      onChange={handleInputChange}
                      error={errors.dateOfPermanency}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      name="description"
                      label="Description *"
                      value={values.description}
                      onChange={handleInputChange}
                      error={errors.description}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <AutocompleteSelect
                      name="name"
                      label="Designation*"
                      value={values.name ? values.name : ""}
                      onChange={handleInputChange}
                      onValueChange={onValueChange}
                      options={designationtype}
                      error={errors.name}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <AutocompleteSelect
                      name="companyLocation"
                      label="Office Location*"
                      value={values.name ? values.name : ""}
                      onChange={handleInputChange}
                      onValueChange={onValueChange}
                      options={designationtype}
                      error={errors.name}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <AutocompleteSelect
                      name="employmentType"
                      label="Employment Type*"
                      value={values.employmentType ? values.employmentType : ""}
                      onChange={handleInputChange}
                      onValueChange={onValueChange}
                      options={employeementtype}
                      error={errors.employmentType}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <AutocompleteSelect
                      name="businessUnit"
                      label="Business Unit*"
                      value={values.businessUnit ? values.businessUnit : ""}
                      onChange={handleInputChange}
                      onValueChange={onValueChange}
                      options={employeementtype}
                      error={errors.employmentType}
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
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    text="Back"
                  />

                  <Button
                    size="small"
                    type="submit"
                    text="Submit"
                    onClick={handleClose}
                  />
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
                <Grid container>
                  {" "}
                  <Grid item xs={4}>
                    <Input
                      name="firstName"
                      label="First Name *"
                      value={values.firstName}
                      onChange={handleInputChange}
                      error={errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      name="lastName"
                      label="Last Name *"
                      value={values.lastName}
                      onChange={handleInputChange}
                      error={errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      name="address"
                      label="Address *"
                      value={values.address}
                      onChange={handleInputChange}
                      error={errors.address}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      name="email"
                      label="Email *"
                      value={values.email}
                      onChange={handleInputChange}
                      error={errors.email}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <DatePicker
                      name="date"
                      label="Date OF *"
                      value={values.date}
                      onChange={handleInputChange}
                      error={errors.date}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      name="contactNo"
                      label="ContactNo *"
                      value={values.contactNo}
                      onChange={handleInputChange}
                      error={errors.contactNo}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      name="maritalStatus"
                      label="MaritalStatus *"
                      value={values.maritalStatus}
                      onChange={handleInputChange}
                      error={errors.maritalStatus}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      name="religon"
                      label="Religon*"
                      value={values.religon}
                      onChange={handleInputChange}
                      error={errors.religon}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      name="passportNo"
                      label="PassportNo*"
                      value={values.passportNo}
                      onChange={handleInputChange}
                      error={errors.passportNo}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      name="drivingLicenceNo"
                      label="DrivingLicenceNo*"
                      value={values.drivingLicenceNo}
                      onChange={handleInputChange}
                      error={errors.drivingLicenceNo}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      name="bloodGroup"
                      label="BloodGroup*"
                      value={values.bloodGroup}
                      onChange={handleInputChange}
                      error={errors.bloodGroup}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <AutocompleteSelect
                      name="gender"
                      label="Gender*"
                      value={values.gender ? values.gender : ""}
                      onChange={handleInputChange}
                      onValueChange={onValueChange}
                      options={genderType}
                      error={errors.gender}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <AutocompleteSelect
                      name="nationality"
                      label="Nationality*"
                      value={values.nationality ? values.nationality : ""}
                      onChange={handleInputChange}
                      onValueChange={onValueChange}
                      options={nationalityType}
                      error={errors.nationality}
                    />
                  </Grid>
                </Grid>

                <Divider />
                <Grid
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                  container
                  style={{ padding: "8px" }}
                ></Grid>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
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
        )}
      </Box>
    </div>
  );
}

export default AddEmployee;
