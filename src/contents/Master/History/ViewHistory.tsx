import { Grid, Input, StepLabel, TextField, Typography, } from "@mui/material";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';

    export default function ViewHistory(props) {

      const handleClickOpen = () => {};

      const {details}=props;

      const steps = details.approvers.map((approversName) => (approversName.names));

      const approvalStatusOriginal = details.approvers.filter((status) => status.appStatus != "Pending").map((approverStatus) => (approverStatus.appStatus));
      
      const approvalStatus = details.approvers.filter((status) => status.appStatus == "Approved").map((filteredStatus) => 
      (filteredStatus.appStatus));

      const [value, setValue] = useState("");

      const handleChange = (event) => {
        setValue(event.target.value);
        console.log(value);
      };

      const [approved, setApproved] = useState(approvalStatus);
      const [activeStep, setActiveStep] = useState(approved.length);
      
      const handleNext = () => {
        const newActiveStep = approved.length;
        setActiveStep(newActiveStep);
      };
    
      const handleApprove = (steps) => {
        const newApproved = approved;
        newApproved[activeStep] = true;
        setApproved(newApproved);
        handleNext();
      };

      const [rejected, setRejected] = useState(approvalStatusOriginal);
      
      const handleReject = (steps) => {
        setRejected([...approved, "Rejected"]);
      }

      const isStepFailed = (step: number) => {
        return step === rejected.indexOf("Rejected");
      };
    
      return (
        <Box sx={{ width: '600px' }}>
          <Stepper sx={{backgroundColor: "White"}} activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const labelProps: {
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
            <Box sx={{ textAlign: "right"}}>
            { props.isEmployeeDetail && <div><Typography variant="h6">Employee ID:</Typography>
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
            { props.isEmployeeDetail && <div><Typography variant="h6" color="black">{details.employeeId}</Typography>
            <Typography variant="h6" color="black">{details.employeeName} </Typography></div>}
            <Typography variant="h6" color="black">{details.leaveType}</Typography>
            <Typography variant="h6" color="black">{details.leaveDays}</Typography>
            <Typography variant="h6" color="black">{details.fromDate}</Typography>
            <Typography variant="h6" color="black">{details.toDate}</Typography>
            <Typography variant="h6" color="black">{details.reason}</Typography>
            <Typography variant="h6" color="black">{details.requestedDate}</Typography>
            </Grid></Grid>
            { props.isResponseButtons &&
            <Box sx={{ textAlign: "center", margin: "20px 0 0 0"}}>
            <TextField
              sx={{ width: "250px"}}
              id="outlined-multiline-flexible"
              label="Comment"
              multiline
              maxRows={2}
              value={value}
              onChange={handleChange}
              />
            </Box>}
            
              <React.Fragment>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button variant="text" sx={{margin: 0.5}} onClick={props.close}>Close</Button>
                  { props.isResponseButtons && <div><Button variant="outlined" sx={{margin: 0.5}} onClick={() => handleReject(steps)}>Reject</Button>
                  <Button variant="contained" sx={{margin: 0.5}} onClick={() => handleApprove(steps)}>Approve</Button></div>}
                </Box>
              </React.Fragment>
          </div>
        </Box>
      );
    }