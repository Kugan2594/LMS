import { Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "src/components/atoms/controlls/Button";
import Input from "src/components/atoms/controlls/Input";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import {
  FORM_VALIDATION,
  spaceValidation,
  PHONE_VALIDATION,
  EMAIL_VALIDATION,
} from "src/util/ValidationMeassage";
import { IEmployementType } from "./EmployementType.interface";

import DatePicker from "src/components/atoms/controlls/DatePicker";
import {
  createEmployementType,
  updateEmployementType,
} from "./ServiceEmployementType";
import AutocompleteSelect from "src/components/atoms/controlls/AutocompleteSelect";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Checkbox from "src/components/atoms/controlls/Checkbox";

let initialFValues: IEmployementType = {
  id: 0,
  type: "",
  
};


function AddEmployementType(props) {
  const { reloadTable, action, editData, handleError } = props;

  const validate = (fieldValues = values) => {
    let temp: IEmployementType = { ...errors };

    if ("type" in fieldValues)
      temp.type = fieldValues.type
        ? spaceValidation.test(fieldValues.type)
          ? ""
          : `type ${FORM_VALIDATION.space}`
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
    console.log(values);
    const formData = new FormData();
    if (validate()) {
      if (action === "add") {
        let data: object = {
          type: values.type,
          
        };
        console.log(data);
        createEmployementType(data).then(
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
          type: values.type,
          
        };

        updateEmployementType(data).then(
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
   
    if (action === "edit") {
      console.log({ editData });

      setValues(editData);
    }
  }, [action, editData, setValues]);

  
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
  const handleClose = () => {
    setOpen(false);
  };

  const onValueChange = (e) => {
    setupdateStatus(false);
    const { name, value } = e.target;

    console.log("hit", name, value);
  };

  

  return (
    <div>
        
      <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              <Form
                onSubmit={handleSubmit}
                onChangeFormValue={onChangeFormValue}

              >
                  <Input
                      name="type"
                      label="EmployementType *"
                      value={values.type}
                      onChange={handleInputChange}
                      error={errors.type}
                    />
                    <Box textAlign="right">
                  <Box sx={{ flex: "1 1 auto" }} />
                  
                  {action !== "edit" && (
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
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
    </div>
  );
}

AddEmployementType.propTypes = {
  reloadTable: PropTypes.func,
  handleError: PropTypes.func,
  action: PropTypes.string,
  editData: PropTypes.object,
};
export default AddEmployementType;
