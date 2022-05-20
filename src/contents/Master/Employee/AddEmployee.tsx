import React from "react";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
// import { IEmployee } from "./Employee.interface";

// let initialFValues: IEmployee = {};

function AddEmployee() {
  // const validate = (fields = values) => {};

  // const {
  //   values,
  //   setValues,
  //   errors,
  //   setErrors,
  //   handleInputChange,
  //   resetForm,
  // }: any = useForm(initialFValues, true, validate);

  const handleSubmit = () => {};

  const onChangeFormValue = () => {};

  const handleClickOpen = () => {};
  return (
    <div>
      <Form onSubmit={handleSubmit} onChangeFormValue={onChangeFormValue}>
        {/* <Input
              name="name"
              label="License Name *"
              value={values.name}
              onChange={handleInputChange}
              error={errors.name}
            /> */}
      </Form>
    </div>
  );
}

export default AddEmployee;
