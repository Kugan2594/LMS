import {
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import Button from "src/components/atoms/controlls/Button";
import Input from "src/components/atoms/controlls/Input";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import { FORM_VALIDATION, spaceValidation } from "src/util/ValidationMeassage";
import { IHolidays } from "./HolidaysInterface";
import { updateHolidays, createHolidays } from './ServiceHolidays';
import DatePicker from "src/components/atoms/controlls/DatePicker";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

let initialFValues: IHolidays = {
  id: 0,
  name: "",
  date: "",
  description: "",
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
    props.businessChange(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    const formData = new FormData();
    if (validate()) {
      if (action === "add") {
        let data: object = {
          name: values.name,
          date: values.date,
          description: values.description,

        };
        console.log(data);
        createHolidays(data).then(
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
          name: editData.name,
          date: editData.date,
          description: editData.description,



        };

        updateHolidays(data).then(
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

      <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>
          <Form
            onSubmit={handleSubmit}
            onChangeFormValue={onChangeFormValue}>
            <Grid container>
              <Grid item xs={8}>
                <DatePicker
                  name="dateOfHoliday"
                  label="Select Date"
                  value={values.dateOfHoliday}
                  onChange={handleInputChange}
                  error={errors.dateOfHoliday}

                />
              </Grid>

              <Grid item xs={8}>

                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Half/Full Day</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value="half day" control={<Radio />} label="half day" />
                    <FormControlLabel value="full day" control={<Radio />} label="full day" />

                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={8}>
                <Input
                  name="HolidayName"
                  label="Holiday Name"
                  value={values.HolidayName}
                  onChange={handleInputChange}
                  error={errors.HolidayName} />
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
                '& .MuiTextField-root': { m: 1, width: '52ch' },
              }}
              noValidate
              autoComplete="off"
            >

              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}

              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
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



    </div>
  );
}
export default AddHolidays;
