import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

export function useForm(
  initialFValues: any,
  validateOnChange = false,
  validate: any
) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };
  const resetFormField = (resetFields: any) => {
    console.log({ ...values, ...resetFields });
    setValues({ ...values, ...resetFields });
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    resetFormField,
  };
}

const useStyles: Function = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "95%",
      margin: 5,
    },
  },
}));

export function Form(props: any) {
  const classes = useStyles();
  const { children, onChangeFormValue, formRef, ...other } = props;

  const onChangeForm = (e: any) => {
    // console.log(e);
    onChangeFormValue && onChangeFormValue();
  };

  return (
    <form
      ref={formRef}
      className={classes.root}
      autoComplete="off"
      {...other}
      onChange={onChangeForm}
    >
      {props.children}
    </form>
  );
}
