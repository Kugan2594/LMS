import { Divider, Grid } from "@mui/material";
import React from "react";
import Button from "src/components/atoms/controlls/Button";
import Input from "src/components/atoms/controlls/Input";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { FORM_VALIDATION, spaceValidation } from "src/util/ValidationMeassage";
import { IEmployeeApprover } from "./EmployeeApprover.interface";

let initialFValues: IEmployeeApprover = {
  id: 0,
  name: "",
  designation: "",
};

function AddEmployeeApprover() {
  const validate = (fieldValues = values) => {
    let temp: IEmployeeApprover = { ...errors };

    if ("name" in fieldValues)
      temp.name = fieldValues.name
        ? spaceValidation.test(fieldValues.name)
          ? ""
          : `License name ${FORM_VALIDATION.space}`
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
    console.log("values", values);
  };

  const onChangeFormValue = () => {};
  const onReset = () => {
    resetForm();
  };
  const handleClickOpen = () => {};
  return (
    <div>
      <Form onSubmit={handleSubmit} onChangeFormValue={onChangeFormValue}>
        <Input
          name="name"
          label="Name *"
          value={values.name}
          onChange={handleInputChange}
          error={errors.name}
        />
        <Input
          name="designation"
          label="Desigantion *"
          value={values.designation}
          onChange={handleInputChange}
          error={errors.address}
        />

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

export default AddEmployeeApprover;
