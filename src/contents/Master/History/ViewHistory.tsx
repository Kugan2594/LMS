import { Grid, StepLabel, Typography, } from "@mui/material";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import { updateApproverStatus } from "./serviceHistory"


export default function ViewHistory(props) {

  const handleClickOpen = () => { };

  const { details, isEmployeeDetails, isResponseButtons, cancel } = props;

  const steps = details.approvers.map((approversName) => (approversName.names));

  const approvalStatusOriginal = details.approvers.filter((status) => status.appStatus != "Pending").map((approverStatus) => (approverStatus.appStatus));

  const approvalStatus = details.approvers.filter((status) => status.appStatus == "Approved").map((filteredStatus) =>
    (filteredStatus.appStatus));

  const [approved, setApproved] = useState(approvalStatus);
  const [activeStep, setActiveStep] = useState(approved.length);

  const handleNext = () => {
    const newActiveStep = approved.length;
    setActiveStep(newActiveStep);
  };

  const handleApprove = () => {
    const newApproved = approved;
    newApproved[activeStep] = true;
    setApproved(newApproved);
    handleNext();
    let data: object = {
      id: details.id,
      statusId: 2
    }
    updateApproverStatus(data).then(
      (res: any) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
        // reloadTable(res);
      }
    );
  };

  const [rejected, setRejected] = useState(approvalStatusOriginal);

  const handleReject = (steps) => {
    setRejected([...approved, "Rejected"]);

    let data: object = {
      id: details.id,
      statusId: 3
    }
    updateApproverStatus(data).then(
      (res: any) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
        // reloadTable(res);
      }
    );
  }

  const isStepFailed = (step: number) => {
    return step === rejected.indexOf("Rejected");
  };

  return (
    <Box sx={{ width: '600px' }}>
      <Stepper sx={{ backgroundColor: "White" }} activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          if (isStepFailed(index)) {
            labelProps.error = true;
          }

          return (
            <Step key={label} completed={approved[index]}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: "right" }}>
              {props.isEmployeeDetail && <div><Typography variant="h6">Employee ID:</Typography>
                <Typography variant="h6">Name:</Typography></div>}
              <Typography variant="h6">Leave Type:</Typography>
              <Typography variant="h6">Leave days:</Typography>
              <Typography variant="h6">From date:</Typography>
              <Typography variant="h6">To date:</Typography>
              <Typography variant="h6">Reason:</Typography>
              <Typography variant="h6">Requested date:</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            {props.isEmployeeDetail && <div><Typography variant="h6" color="black">{details.employeeId}</Typography>
              <Typography variant="h6" color="black">{details.employeeName} </Typography></div>}
            <Typography variant="h6" color="black">{details.leaveType}</Typography>
            <Typography variant="h6" color="black">{details.leaveDays}</Typography>
            <Typography variant="h6" color="black">{details.fromDate}</Typography>
            <Typography variant="h6" color="black">{details.toDate}</Typography>
            <Typography variant="h6" color="black">{details.reason}</Typography>
            <Typography variant="h6" color="black">{details.requestedDate}</Typography>
          </Grid></Grid>
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button variant="text" sx={{ margin: 0.5 }} onClick={props.cancel}>Close</Button>
            {props.isResponseButtons && <div><Button variant="outlined" sx={{ margin: 0.5 }} onClick={() => handleReject(steps)}>Reject</Button>
              <Button variant="contained" sx={{ margin: 0.5 }} onClick={handleApprove}>Approve</Button></div>}
          </Box>
        </React.Fragment>
      </div>
    </Box>
  );
}