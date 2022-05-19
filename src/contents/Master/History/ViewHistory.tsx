import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import Button from "src/components/atoms/controlls/Button";
import Input from "src/components/atoms/controlls/Input";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { FORM_VALIDATION, spaceValidation } from "src/util/ValidationMeassage";

function ViewHistory(details: any) {

  const handleClickOpen = () => {};
  return (
    <div>
            <Typography variant="h6">Employee ID: {details.employeeId} </Typography>
            <Typography variant="h6">Name: {details.name} </Typography>
            <Typography variant="h6">Leave Type: {details.leaveType} </Typography>
            <Typography variant="h6">Leave days: {details.leaveDays}</Typography>
            <Typography variant="h6">From date: {details.fromDate}</Typography>
            <Typography variant="h6">To date: {details.toDate}</Typography>
    </div>
  );
}

export default ViewHistory;