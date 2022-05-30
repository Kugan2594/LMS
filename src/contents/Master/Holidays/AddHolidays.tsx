import { Divider, Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import Button from "src/components/atoms/controlls/Button";
import Input from "src/components/atoms/controlls/Input";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import { FORM_VALIDATION, spaceValidation } from "src/util/ValidationMeassage";
import { IHolidays } from "./HolidaysInterface";
import { updateHoliday, createHoliday } from "./ServiceHolidays";
import DatePicker from "src/components/atoms/controlls/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "src/components/atoms/controlls/Checkbox";

let initialFValues: IHolidays = {
  id: 0,
  date: "",
  type: "",
  fullDay: false,
};

function AddHolidays(props) {
  const { reloadTable, action, editData, handleError } = props;
  const handleClickOpen = (value) => {
    setOpen(true);
  };
  const [open, setOpen] = useState(false);
  const [updateStatus, setupdateStatus] = useState(true);
  const [error, setError] = useState(false);
  const onChangeHandler = (e) => {
    props.holidayChange(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    const formData = new FormData();
    if (validate()) {
      if (action === "add") {
        let data: object = {
          date: values.date,
          type: values.type,
          day: values.day,
        };
        console.log(data);
        createHoliday(data).then(
          (res: any) => {
            console.log(res);
            reloadTable(res);
            handleClose();
            resetForm();
          },
          (error) => {
            console.log(error);
            reloadTable(error);
            handleClose();
            handleError(error);
          }
        );
      } else {
        const formData = new FormData();

        let data: object = {
          id: editData.id,
          date: editData.date,
          type: editData.type,
          day: editData.day,
        };

        updateHoliday(data).then(
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
    let temp: IHolidays = { ...errors };

    if ("type" in fieldValues)
      temp.type = fieldValues.type
        ? spaceValidation.test(fieldValues.type)
          ? ""
          : `type ${FORM_VALIDATION.space}`
        : FORM_VALIDATION.required;

    if ("date" in fieldValues)
      temp.date = fieldValues.date ? "" : "This field is required.";
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
  const handleClose = () => {
    setOpen(false);
  };
  const onReset = () => {
    resetForm();
  };
  const onChangeFormValue = () => {
    setupdateStatus(false);
  };
  const editOnclick = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (action === "edit") {
      console.log({ editData });

      setValues(editData);
    }
  }, [action, editData, setValues]);
  return (
    <div>
      <Box sx={{ width: "100%", justifyContent: "center" }}>
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Form onSubmit={handleSubmit} onChangeFormValue={onChangeFormValue}>
              <Grid container>
                {" "}
                <Grid item xs={12} md={4} lg={4}>
                  <DatePicker
                    name="date"
                    label="Select Date"
                    value={values.date}
                    onChange={handleInputChange}
                    error={errors.date}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                <Checkbox
                    name="day"
                    label="Half Day"
                    value={values.day}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <Input
                    name="type"
                    label="Holiday type"
                    value={values.type}
                    onChange={handleInputChange}
                    error={errors.type}
                  />
                </Grid>
                <Divider />
              </Grid>

              <Grid
                display="flex"
                flexDirection="column"
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
export default AddHolidays;
