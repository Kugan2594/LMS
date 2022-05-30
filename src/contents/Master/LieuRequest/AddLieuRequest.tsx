import { Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "src/components/atoms/controlls/Button";
import Input from "src/components/atoms/controlls/Input";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import { FORM_VALIDATION, spaceValidation } from "src/util/ValidationMeassage";
import { ILieuRequest } from "./LieuRequest.interface";

import DatePicker from "src/components/atoms/controlls/DatePicker";
import {
  createLieuRequest,
  updateLieuRequest,
  getAllLieuRequest,
  getAllEmployee,
} from "./serviceLieuRequest";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import AutocompleteSelect from "src/components/atoms/controlls/AutocompleteSelect";

let initialFValues: ILieuRequest = {
  id: 0,
  requestDate: "",
  employeeId: 0,
};

function AddLieuRequest(props) {
  const { reloadTable, action, editData, handleError,handleClose } = props;
  const [employeeData, setemployeeData] = useState([]);

  const validate = (fieldValues = values) => {
    let temp: ILieuRequest = { ...errors };

    if ("employeeId" in fieldValues)
      temp.employeeId = fieldValues.employeeId ? "" : "This field is required.";

    if ("requestDate" in fieldValues)
      temp.requestDate = fieldValues.requestDate
        ? spaceValidation.test(fieldValues.requestDate)
          ? ""
          : `requestDate ${FORM_VALIDATION.space}`
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
    const formData = new FormData();

    if (validate()) {
      if (action === "add") {
        let data: object = {
          employeeId: values.employeeId,
          requestDate: values.requestDate,
        };
        createLieuRequest(data).then(
          (res: any) => {
            reloadTable(res);
            handleClose();
            resetForm();
          },
          (error) => {
            handleClose();
            handleError(error);
          }
        );
      } else {
        const formData = new FormData();
        let data: object = {
          id: editData.id,
          employeeId: values.employeeId,
          requestDate: values.requestDate,
        };

        updateLieuRequest(data).then(
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
    getEmployeeSelectData();
    if (action === "edit") {
      setValues(editData);
    }
  }, [action, editData, setValues]);

  const getEmployeeSelectData = () => {
    let data: any = [];
    getAllEmployee().then((res: []) => {
      res.map((post: any) => {
        data.push({ id: post.id, title: post.lastName });
        return null;
      });
      setemployeeData(data);
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

  return (
    <React.Fragment>
      <Typography sx={{ mt: 2, mb: 1 }}>
        <Form onSubmit={handleSubmit} onChangeFormValue={onChangeFormValue}>
          <Grid container>
            <Grid item xs={12} md={12} lg={12}>
              <AutocompleteSelect
                name="employeeId"
                label="Employee Name *"
                value={values.employeeId}
                onChange={handleInputChange}
                onValueChange={onValueChange}
                options={employeeData}
                error={errors.employeeId}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <DatePicker
                name="requestDate"
                label="Request Date"
                value={values.requestDate}
                onChange={handleInputChange}
                error={errors.requestDate}
              />
            </Grid>

            <Divider />
            <Grid
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              container
              style={{ padding: "8px" }}
            ></Grid>
          </Grid>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "52ch" },
            }}
            noValidate
            autoComplete="off"
          ></Box>
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
  );
}

AddLieuRequest.propTypes = {
  reloadTable: PropTypes.func,
  handleError: PropTypes.func,
  action: PropTypes.string,
  editData: PropTypes.object,
  handleClose: PropTypes.func,

};
export default AddLieuRequest;
