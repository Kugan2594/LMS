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
    const handleClickOpen = () => {};
    const onValueChange = (e) => {
        setupdateStatus(false);
        const { name, value } = e.target;
        console.log("hit", name, value);
    };
    return (
        <div>
            <Form onSubmit={handleSubmit} onChangeFormValue={onChangeFormValue}>
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
                >
                    <div>
                        <Button
                            size="small"
                            color="secondary"
                            text="Reset"
                            onClick={onReset}
                        />

                        <Button size="small" type="submit" text="Submit" />
                    </div>
                </Grid>
            </Form>
        </div>
    );
}

export default AddEmployee;
