import { Divider, Grid, Typography, } from "@mui/material";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';

interface IViewHistory {
  employeeId?: number;
  employeeName?: string;
  leaveType?: string;
  leaveDays?: number;
  fromDate?: string;
  toDate?: string;
  reason?: string;
  status?: string;
  approvers?: any[];
  cancel?: any;
  isEmployeeDetail?: boolean;
  isResponseButtons?: boolean;
}

let initialFValues: IViewHistory = {
  employeeId: 0,
  employeeName: "",
  leaveType: "",
  leaveDays: 0,
  fromDate: "",
  toDate: "",
  reason: "",
  status: "",
  approvers: [],
  isEmployeeDetail: true,
  isResponseButtons: true,
  
};

    export default function ViewHistory(props) {

      const {details,name}=props;

      const steps = details.approvers.map((approversName) => (approversName.names));

      const approvalStatus = details.approvers.filter((status) => status.appStatus == "Approved").map((filteredStatus) => 
      (filteredStatus.appStatus));

      const handleClickOpen = () => {};

      const [approved, setApproved] = useState(approvalStatus);
      const [activeStep, setActiveStep] = useState(approved.length);
      
      const handleNext = () => {
        const newActiveStep = approved.length;
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

      const [rejected, setRejected] = useState(false);

      const handleReject = (steps) => {
        setRejected(true);
      }
    
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
              <React.Fragment>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button variant="text" sx={{margin: 0.5}} onClick={props.cancel}>Close</Button>
                  { props.isResponseButtons && <div><Button variant="outlined" sx={{margin: 0.5}} onClick={() => handleReject(steps)}>Reject</Button>
                  <Button variant="contained" sx={{margin: 0.5}} onClick={handleApprove}>Approve</Button></div>}
                </Box>
              </React.Fragment>
          </div>
        </Box>
      );
    }