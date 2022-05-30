import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Divider, Grid, Typography } from "@mui/material";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import Input from "src/components/atoms/controlls/Input";
import AutocompleteSelect from "src/components/atoms/controlls/AutocompleteSelect";
import Button from "src/components/atoms/controlls/Button";
import { FORM_VALIDATION, spaceValidation } from "src/util/ValidationMeassage";
import { IEmployeeLeaveType } from "./ManageAllocateDay.interface";
import {
  createEmployeeLeaveType,
  getAllEmployee,
  getAllLeaveType,
  updateEmployeeLeaveType,
} from "./ServiceAllocationDays";

let initialFValues: IEmployeeLeaveType = {
  id: 0,
  employeeId: 0,
  leavetypeId: 0,
  allocatedDays: 0,
  remainingDays: 0,
};

function AddAllocationDays(props) {
  const { reloadTable, action, editData, handleError } = props;
  const [employeeData, setemployeeData] = useState([]);
  const [leaveTypeData, setleaveTypeData] = useState([]);
  const [updateStatus, setupdateStatus] = useState(true);
  const [employeeId, setemployeeId] = useState("");
  const [leavetypeId, setleavetypeId] = useState("");

  const validate = (fieldValues = values) => {
    let temp: IEmployeeLeaveType = { ...errors };

    // if ("allocatedDays" in fieldValues)
    //   temp.allocatedDays = fieldValues.allocatedDays
    //     ? spaceValidation.test(fieldValues.allocatedDays)
    //       ? ""
    //       : `AllocatedDays ${FORM_VALIDATION.space}`
    //     : FORM_VALIDATION.required;

    // if ("remainingDays" in fieldValues)
    //   temp.remainingDays = fieldValues.remainingDays
    //     ? spaceValidation.test(fieldValues.remainingDays)
    //       ? ""
    //       : `RemainingDays ${FORM_VALIDATION.space}`
    //     : FORM_VALIDATION.required;

    if ("employeeId" in fieldValues)
      temp.employeeId = fieldValues.employeeId ? "" : "This field is required.";

    if ("leavetypeId" in fieldValues)
      temp.leavetypeId = fieldValues.leavetypeId
        ? ""
        : "This field is required.";

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

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    const formData = new FormData();
    if (validate()) {
      if (action === "add") {
        let data: object = {
          allocatedDays: values.allocatedDays,
          remainingDays: values.remainingDays,
          employeeId: values.employeeId,
          leavetypeId: values.leavetypeId,
        };
        console.log(data);
        createEmployeeLeaveType(data).then(
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
          allocatedDays: values.allocatedDays,
          remainingDays: values.remainingDays,
          employeeId: values.employeeId,
          leavetypeId: values.leavetypeId,
        };

        updateEmployeeLeaveType(data).then(
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

  const onChangeFormValue = () => {
    setupdateStatus(false);
  };

  const onValueChange = (e) => {
    setupdateStatus(false);
    const { name, value } = e.target;

    console.log("hit", name, value);
  };

  //   dropdown
  useEffect(() => {
    getEmployeeSelectData();
    getLeaveTypeSelectData();
    if (action === "edit") {
      console.log({ editData });

      setValues(editData);
    }
  }, [action, editData, setValues]);

  //   employee dropdown
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

  //   leavetype dropdown
  const getLeaveTypeSelectData = () => {
    let data: any = [];
    getAllLeaveType().then((res: []) => {
      res.map((post: any) => {
        data.push({ id: post.id, title: post.type });
        return null;
      });
      setleaveTypeData(data);
    });
  };

  return (
    <div>
      <Box sx={{ width: "100%", justifyContent: "center" }}>
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Form onSubmit={handleSubmit} onChangeFormValue={onChangeFormValue}>
              <Grid container>
                {" "}
                <Grid item xs={12} md={6} lg={6}>
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
                <Grid item xs={12} md={6} lg={6}>
                  <AutocompleteSelect
                    name="leavetypeId"
                    label="leave Type *"
                    value={values.leavetypeId}
                    onChange={handleInputChange}
                    onValueChange={onValueChange}
                    options={leaveTypeData}
                    error={errors.leavetypeId}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Input
                    name="allocatedDays"
                    label="Allocated Days *"
                    value={values.allocatedDays}
                    onChange={handleInputChange}
                    error={errors.allocatedDays}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Input
                    name="remainingDays"
                    label="Remaining Days *"
                    value={values.remainingDays}
                    onChange={handleInputChange}
                    error={errors.remainingDays}
                  />
                </Grid>
              </Grid>

              <Grid
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                container
                style={{ padding: "8px" }}
              ></Grid>
              
              <Box textAlign="right">

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
      </Box>
    </div>
  );
}

export default AddAllocationDays;
