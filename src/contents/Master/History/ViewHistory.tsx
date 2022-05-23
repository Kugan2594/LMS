import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';

    export default function ViewHistory(props) {

      const {details,name}=props;

      const steps = details.approvers.map((approversName) => (approversName.names));

      const approvalStatus = details.approvers.filter((status) => status.appStatus == "Approved").map((filteredStatus) => 
      (filteredStatus.appStatus));

      const handleClickOpen = () => {};

      const [activeStep, setActiveStep] = React.useState(0);
      const [approved, setApproved] = React.useState(approvalStatus);
    
      const totalSteps = () => {
        return steps.length;
      };
    
      const approvedSteps = () => {
        return approved.length;
      };
    
      const allApproved = () => {
        return approvedSteps() === totalSteps();
      };
    
      const handleNext = () => {
        const newActiveStep = approved.length + 1;
        setActiveStep(newActiveStep);
      };
    
      const handleStep = (step: number) => () => {
        setActiveStep(step);
      };
    
      const handleApprove = () => {
        const newApproved = approved;
        newApproved[activeStep] = true;
        setApproved(newApproved);
        handleNext();
      };
    
      return (
        <Box sx={{ width: '600px' }}>
          <Stepper sx={{backgroundColor: "White"}} activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label} completed={approved[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            { props.isEmployeeDetail && <div><Typography variant="h6">Employee ID: {details.employeeId} </Typography>
            <Typography variant="h6">Name: {details.name} </Typography></div>}
            <Typography variant="h6">Leave Type: {details.leaveType} </Typography>
            <Typography variant="h6">Leave days: {details.leaveDays}</Typography>
            <Typography variant="h6">From date: {details.fromDate}</Typography>
            <Typography variant="h6">To date: {details.toDate}</Typography>
              <React.Fragment>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleApprove}>Approve</Button>
                </Box>
              </React.Fragment>
          </div>
        </Box>
      );
    }