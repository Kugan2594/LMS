import { Divider, Grid, Typography } from "@mui/material";
import React from "react";

function ViewHistory(props) {
  const {details,name}=props;

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