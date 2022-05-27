import { Divider, Grid, ButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "src/components/atoms/controlls/Button";
import Input from "src/components/atoms/controlls/Input";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import {
  FORM_VALIDATION,
  spaceValidation,
  PHONE_VALIDATION,
  EMAIL_VALIDATION,
  NIC_VALIDATION,
  LICENCE_VALIDATION,
  PASSPORT_VALIDATION
} from "src/util/ValidationMeassage";
import { IEmployee } from "./Employee.interface";

import DatePicker from "src/components/atoms/controlls/DatePicker";
import {
  createEmployee,
  updateEmployee,
  getAllCompanyLocationForDropDown,
  getAllDesignationForDropDown,
  getAllEmployementTypeForDropDown,
  getAllBusinessUnitForDropDown,
} from "./ServiceEmployee";
import AutocompleteSelect from "src/components/atoms/controlls/AutocompleteSelect";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Checkbox from "src/components/atoms/controlls/Checkbox";
import MobileStepper from "@mui/material/MobileStepper";
import Button1 from "@mui/material/Button";

let initialFValues: IEmployee = {
  id: 0,
  firstName: "",
  address: "",
  lastName: "",
  email: "",
  gender: "",
  contactNo: "",
  nic: "",
  maritalStatus: "",
  nationality: "",
  religon: "",
  passportNo: "",
  drivingLicenceNo: "",
  bloodGroup: "",
  approverStatus: false,
  joinDate: "",
  dateOfPermanency: "",
  dateOfBirth: "",
  companyLocationId: 0,
  designationId: 0,
  employmentTypeId: "",
  businessUnitId: "",
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
  {
    id: "OTHER",
    title: "OTHER",
  },
];
const nationalityType = [
  {
    id: "Srilankan",
    title: "Srilankan",
  },
  {
    id: "Indian",
    title: "Indian",
  },
];

const employeementtype = [
  {
    id: "Contract Basis",
    title: "Contract Basis",
  },
  {
    id: "Temporary",
    title: "Temporary",
  },
  {
    id: "Intern",
    title: "Intern",
  },
];

const maritalStatus = [
  {
    id: "Single",
    title: "Single",
  },
  {
    id: "Married",
    title: "Married",
  },
];

const bloodGroup = [
  {
    id: "A+",
    title: "A+",
  },
  {
    id: "A-",
    title: "A-",
  },
  {
    id: "B+",
    title: "B+",
  },
  {
    id: "B-",
    title: "B-",
  },
  {
    id: "AB+",
    title: "AB+",
  },
  {
    id: "AB-",
    title: "AB-",
  },
  {
    id: "O+",
    title: "O+",
  },
  {
    id: "O-",
    title: "O-",
  },
];

const religon = [
  {
    id: "Hindu",
    title: "Hindu",
  },
  {
    id: "RC",
    title: "RC",
  },
  {
    id: "NRC",
    title: "NRC",
  },
  {
    id: "Muslim",
    title: "Muslim",
  },
  {
    id: "Buddhist",
    title: "Buddhist",
  },
];

function AddEmployee(props) {
  const { reloadTable, action, editData, handleError,handleClose } = props;
  const [companyLocationData, setcompanyLocationData] = useState([]);
  const [designationData, setdesignationData] = useState([]);
  const [employementTypeData, setemployementTypeData] = useState([]);
  const [businessUnitData, setbusinessUnitData] = useState([]);

  const validate = (fieldValues = values) => {
    let temp: IEmployee = { ...errors };

    if ("firstName" in fieldValues)
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
    if ("religon" in fieldValues)
      temp.religon = fieldValues.religon
        ? spaceValidation.test(fieldValues.religon)
          ? ""
          : `religon ${FORM_VALIDATION.space}`
        : FORM_VALIDATION.required;

    if ("nationality" in fieldValues)
      temp.nationality = fieldValues.nationality
        ? spaceValidation.test(fieldValues.nationality)
          ? ""
          : `nationality ${FORM_VALIDATION.space}`
        : FORM_VALIDATION.required;

    if ("gender" in fieldValues)
      temp.gender = fieldValues.gender
        ? spaceValidation.test(fieldValues.gender)
          ? ""
          : `gender ${FORM_VALIDATION.space}`
        : FORM_VALIDATION.required;

    if ("nic" in fieldValues)
      temp.nic = fieldValues.nic
        ? NIC_VALIDATION.test(fieldValues.nic)
          ? ""
          : `nic ${FORM_VALIDATION.space}`
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

        if ("drivingLicenceNo" in fieldValues)
        temp.drivingLicenceNo =fieldValues.drivingLicenceNo? LICENCE_VALIDATION.test(fieldValues.drivingLicenceNo)
          ? ""
          : FORM_VALIDATION.drivingLicenceNo:""; 

          if ("passportNo" in fieldValues)
        temp.passportNo =fieldValues.passportNo? PASSPORT_VALIDATION.test(fieldValues.passportNo)
          ? ""
          : FORM_VALIDATION.passportNo:""; 
    if ("address" in fieldValues)
      temp.address =
        fieldValues.address.length !== 0
          ? spaceValidation.test(fieldValues.address)
            ? ""
            : `Address ${FORM_VALIDATION.space}`
          : FORM_VALIDATION.required;
    if ("dateOfBirth" in fieldValues)
      temp.dateOfBirth = fieldValues.dateOfBirth
        ? ""
        : "This field is required.";
    if ("joinDate" in fieldValues)
      temp.joinDate = fieldValues.joinDate ? "" : "This field is required.";

    if ("companyLocationId" in fieldValues)
      temp.companyLocationId = fieldValues.companyLocationId
        ? ""
        : "This field is required.";
    if ("designationId" in fieldValues)
      temp.designationId = fieldValues.designationId
        ? ""
        : "This field is required.";
    if ("dateOfPermanency" in fieldValues)
      temp.dateOfPermanency = fieldValues.dateOfPermanency
        ? ""
        : "This field is required. ";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const validate1 = (fieldValues = values) => {
    let temp: IEmployee = { ...errors };

    if ("joinDate" in fieldValues)
      temp.joinDate = fieldValues.joinDate ? "" : "This field is required.";

    if ("companyLocationId" in fieldValues)
      temp.companyLocationId = fieldValues.companyLocationId
        ? ""
        : "This field is required.";
    if ("designationId" in fieldValues)
      temp.designationId = fieldValues.designationId
        ? ""
        : "This field is required.";
    if ("dateOfPermanency" in fieldValues)
      temp.dateOfPermanency = fieldValues.dateOfPermanency
        ? ""
        : "This field is required. ";

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
      if (action === "add") {
        let data: object = {
          firstName: values.firstName,
          address: values.address,
          lastName: values.lastName,
          email: values.email,
          gender: values.gender,
          contactNo: values.contactNo,
          nic: values.nic,
          maritalStatus: values.maritalStatus,
          nationality: values.nationality,
          religon: values.religon,
          passportNo: values.passportNo,
          drivingLicenceNo: values.drivingLicenceNo,
          bloodGroup: values.bloodGroup,
          approverStatus: values.approverStatus,
          joinDate: values.joinDate,
          dateOfPermanency: values.dateOfPermanency,
          dateOfBirth: values.dateOfBirth,
          companyLocationId: values.companyLocationId,
          designationId: values.designationId,
          employmentTypeId: values.employmentTypeId,
          businessUnitId: values.businessUnitId,
        };
        console.log(data);
        createEmployee(data).then(
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
        const formData = new FormData();

        let data: object = {
          id: editData.id,
          firstName: values.firstName,
          address: values.address,
          lastName: values.lastName,
          email: values.email,
          gender: values.gender,
          contactNo: values.contactNo,
          maritalStatus: values.maritalStatus,
          nationality: values.nationality,
          religon: values.religon,
          passportNo: values.passportNo,
          drivingLicenceNo: values.drivingLicenceNo,
          bloodGroup: values.bloodGroup,
          description: values.description,
          joinDate: values.joinDate,
          dateOfBirth: values.dateOfBirth,
          companyLocationId: values.companyLocationId,
          designationId: values.designationId,
          employmentTypeId: values.employmentTypeId,
          businessUnitId: values.businessUnitId,
          dateOfPermanency: values.dateOfPermanency,
          nic: values.nic,
        };

        updateEmployee(data).then(
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
  useEffect(() => {
    getCompanyLocationSelectData();
    getDesignationSelectData();
    getEmployementTypeSelectData();
    getBusinessUnitSelectData();
    if (action === "edit") {
      console.log({ editData });

      setValues(editData);
    }
  }, [action, editData, setValues]);

  const getCompanyLocationSelectData = () => {
    let data: any = [];
    getAllCompanyLocationForDropDown().then((res: []) => {
      res.map((post: any) => {
        data.push({ id: post.id, title: post.location });
        return null;
      });
      setcompanyLocationData(data);
    });
  };

  const getEmployementTypeSelectData = () => {
    let data: any = [];
    getAllEmployementTypeForDropDown().then((res: []) => {
      res.map((post: any) => {
        data.push({ id: post.id, title: post.type });
        return null;
      });
      setemployementTypeData(data);
    });
  };

  const getBusinessUnitSelectData = () => {
    let data: any = [];
    getAllBusinessUnitForDropDown().then((res: []) => {
      res.map((post: any) => {
        data.push({ id: post.id, title: post.name });
        return null;
      });
      setbusinessUnitData(data);
    });
  };

  const getDesignationSelectData = () => {
    let data: any = [];
    getAllDesignationForDropDown().then((res: []) => {
      res.map((post: any) => {
        data.push({ id: post.id, title: post.name });
        return null;
      });
      setdesignationData(data);
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


  const onValueChange = (e) => {
    setupdateStatus(false);
    const { name, value } = e.target;

    console.log("hit", name, value);
  };

  const steps = ["Personal Details", "Employement Details"];

  const [skipped, setSkipped] = React.useState(new Set<number>());

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

  return (
    <div>
      <Box sx={{ width: "100%", height: "100%", justifyContent: "center" }}>
        {activeStep === steps.length - 2 ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              <Form>
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
                      name="dateOfBirth"
                      label="Date OF Birth*"
                      value={values.dateOfBirth}
                      onChange={handleInputChange}
                      error={errors.dateOfBirth}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      name="contactNo"
                      label="Contact No *"
                      value={values.contactNo}
                      onChange={handleInputChange}
                      error={errors.contactNo}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      name="nic"
                      label="NIC No *"
                      value={values.nic}
                      onChange={handleInputChange}
                      error={errors.nic}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <AutocompleteSelect
                      name="maritalStatus"
                      label="MaritalStatus *"
                      value={values.maritalStatus}
                      onChange={handleInputChange}
                      onValueChange={onValueChange}
                      options={maritalStatus}
                      error={errors.maritalStatus}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <AutocompleteSelect
                      name="religon"
                      label="Religon*"
                      value={values.religon}
                      onChange={handleInputChange}
                      onValueChange={onValueChange}
                      options={religon}
                      error={errors.religon}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      name="passportNo"
                      label="Passport No"
                      value={values.passportNo}
                      onChange={handleInputChange}
                      error={errors.passportNo}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      name="drivingLicenceNo"
                      label="Driving Licence No"
                      value={values.drivingLicenceNo}
                      onChange={handleInputChange}
                      error={errors.drivingLicenceNo}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <AutocompleteSelect
                      name="bloodGroup"
                      label="Blood Group"
                      value={values.bloodGroup}
                      onChange={handleInputChange}
                      onValueChange={onValueChange}
                      options={bloodGroup}
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
              </Form>
            </Typography>
          </React.Fragment>
        ) : (
          <Typography>
            <Form onSubmit={handleSubmit} onChangeFormValue={onChangeFormValue}>
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
                  <AutocompleteSelect
                    name="designationId"
                    label="Designation*"
                    value={values.designationId}
                    onChange={handleInputChange}
                    onValueChange={onValueChange}
                    options={designationData}
                    error={errors.designationId}
                  />
                </Grid>
                <Grid item xs={4}>
                  <AutocompleteSelect
                    name="companyLocationId"
                    label="Office Location*"
                    value={values.companyLocationId}
                    onChange={handleInputChange}
                    options={companyLocationData}
                    error={errors.companyLocation}
                  />
                </Grid>
                <Grid item xs={4}>
                  <AutocompleteSelect
                    name="employmentTypeId"
                    label="Employment Type*"
                    value={values.employmentTypeId ? values.employmentTypeId : ""}
                    onChange={handleInputChange}
                    onValueChange={onValueChange}
                    options={employementTypeData}
                    error={errors.employmentTypeId}
                  />
                </Grid>
                <Grid item xs={4}>
                  <AutocompleteSelect
                    name="businessUnitId"
                    label="Business Unit*"
                    value={values.businessUnitId ? values.businessUnitId : ""}
                    onChange={handleInputChange}
                    onValueChange={onValueChange}
                    options={businessUnitData}
                    error={errors.businessUnitId}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Checkbox
                    name="approverStatus"
                    label="Approver Status"
                    value={values.approverStatus}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Form>
          </Typography>
        )}
        <Box sx={{ pt: 2 }}>
          <Box />
          <MobileStepper
            variant="dots"
            steps={2}
            // position="static"
            activeStep={activeStep}
            sx={{}}
            nextButton={
              <ButtonGroup  variant="outlined" aria-label="outlined button group">
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

AddEmployee.propTypes = {
  reloadTable: PropTypes.func,
  handleError: PropTypes.func,
  action: PropTypes.string,
  editData: PropTypes.object,
  handleClose: PropTypes.func
};
export default AddEmployee;
