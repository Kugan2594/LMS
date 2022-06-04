import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { values } from "lodash";
import React, { useState, useEffect } from "react";
import Button from "src/components/atoms/controlls/Button";
import Input from "src/components/atoms/controlls/Input";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import { FORM_VALIDATION, spaceValidation } from "src/util/ValidationMeassage";
import { IRoles } from "./RolesInterface";
import { createRole, updateRole } from "./ServiceRoles";

let initialFValues: IRoles = {
  id: 0,
  name: "",
};

function AddRoles(props) {
  const { reloadTable, action, editData, handleError, handleClose } = props;
  const handleClickOpen = (value) => {
    setOpen(true);
  };
  const [open, setOpen] = useState(false);
  const [updateStatus, setupdateStatus] = useState(true);
  const [role, setRole] = useState("");
  const [error, setError] = useState(false);
  const onChangeHandler = (e) => {
    props.roleChange(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    const formData = new FormData();
    if (validate()) {
      if (action === "add") {
        let data: object = {
          name: values.name,
        };
        console.log(data);
        createRole(data).then(
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
          name: values.name,
        };

        updateRole(data).then(
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

  const validate = (fieldValues = values) => {
    let temp: IRoles = { ...errors };

    if ("name" in fieldValues)
      temp.name = fieldValues.name
        ? spaceValidation.test(fieldValues.name)
          ? ""
          : `name ${FORM_VALIDATION.space}`
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

  const onReset = () => {
    resetForm();
  };
  const onChangeFormValue = () => {
    setupdateStatus(false);
  };
  const editOnclick = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (action === "edit") {
      console.log({ editData });

      setValues(editData);
    }
  }, [action, editData, setValues]);

  return (
    <div>
      <Box>
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Form onSubmit={handleSubmit} onChangeFormValue={onChangeFormValue}>
              <Input
                name="name"
                label="Role Name *"
                value={values.name}
                onChange={handleInputChange}
                error={errors.name}
              />

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "auto 1 1 1" }} />
                <Button
                  size="small"
                  color="inherit"
                  text="Cancel"
                  onClick={handleClose}
                />
                <Box sx={{ flex: "1 1 auto" }} />
                {action !== "edit" && (
                  <Button
                    size="small"
                    variant="outlined"
                    text="Reset"
                    onClick={onReset}
                  />
                )}
                <Button
                  size="small"
                  type="submit"
                  text={action === "edit" ? "Update" : "Submit"}
                  disabled={action === "edit" ? updateStatus : false}
                />
              </Box>
            </Form>
          </Typography>
        </React.Fragment>
      </Box>
    </div>
  );
}

export default AddRoles;
