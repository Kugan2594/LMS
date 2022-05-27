import { Grid, StepLabel, TextField, Typography, } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import { getLeaveApproverStatus, updateApproverStatus } from "./serviceHistory";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function createData(data) {
  let convertData = data.map((post, index) => {
      return {
          id : post.id,
          employeeId:post.employeeId,
          reason: post.reason,
          fromDate: post.fromDate,
          toDate: post.toDate,
          leaveDays: post.leaveDays,
          requestedDate: post.requestedDate,
          leaveType: post.employeeLeaveType.leaveType.type,
          firstName: post.employee.firstName,
          lastName: post.employee.lastName,
      };
  });
  return convertData;
}



export default function ViewHistory(props) {
  const [dataSource, setdataSource] = useState([]);
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

  useEffect(() => {
    getLeaveApproverStatusData();
});

const getLeaveApproverStatusData = () => {
    getLeaveApproverStatus().then((res: any) => {
        let value: [] = details(res.results.ApprovalLeaveHistory);
        setdataSource(value);
    });
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

  function RejectIcon() {
    return (
      <CloseRoundedIcon style={{color: "white", borderRadius: "50%", backgroundColor: "red"}} />
    );
  }

  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ width: '600px'}}>
      <Stepper sx={{ backgroundColor: "White" }} activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
            StepIconComponent?: any;
          } = {};
          if (isStepFailed(index)) {
            labelProps.error = true;
            labelProps.StepIconComponent= RejectIcon;
          }

          return (
            <Step key={label} completed={approved[index]}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        <Grid container>
          <Grid item xs={4}></Grid>
            <Box>
              {props.isEmployeeDetail && <div><Typography variant="subtitle1" display="inline">Employee ID</Typography><Typography variant="h6" color="black" display="inline" marginLeft= "34px">{details.employeeId}</Typography></div>}
              {props.isEmployeeDetail && <div><Typography variant="subtitle1" display="inline">Name</Typography><Typography variant="h6" color="black" display="inline" marginLeft= "75px">{details.employeeName}</Typography></div>}
              <div><Typography variant="subtitle1" display="inline">Leave Type</Typography><Typography variant="h6" color="black" display="inline" marginLeft= "44px">{details.leaveType}</Typography></div>
              <div><Typography variant="subtitle1" display="inline">Leave days</Typography><Typography variant="h6" color="black" display="inline" marginLeft= "44px">{details.leaveDays}</Typography></div>
              <div><Typography variant="subtitle1" display="inline">From date</Typography><Typography variant="h6" color="black" display="inline" marginLeft= "48px">{details.fromDate}</Typography></div>
              <div><Typography variant="subtitle1" display="inline">To date</Typography><Typography variant="h6" color="black" display="inline" marginLeft= "66px">{details.toDate}</Typography></div>
              <div><Typography variant="subtitle1" display="inline">Reason</Typography><Typography variant="h6" color="black" display="inline" marginLeft= "68px">{details.reason}</Typography></div>
              <div><Typography variant="subtitle1" display="inline">Requested date</Typography><Typography variant="h6" color="black" display="inline" marginLeft= "15px">{details.requestedDate}</Typography></div>
              <div><Typography variant="subtitle1" display="inline">Status</Typography><Typography variant="h6" color="black" display="inline" marginLeft= "74px">{steps.length == approvalStatusOriginal.length || rejected.includes("Rejected") ? rejected[rejected.length - 1] : "Pending"}</Typography></div>
              {rejected.includes("Rejected") && <div><Typography variant="subtitle1" display="inline">Comment</Typography><Typography variant="h6" color="black" display="inline" marginLeft= "51px">{details.comment}</Typography></div>}
            </Box>
            </Grid>
          {props.isResponseButtons && <Box sx={{textAlign: "Center", margin: "15px 0 5px 0"}}>
          <TextField sx={{width: "250px"}}
          id="comment"
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
            <Button variant="text" sx={{ margin: 0.5 }} onClick={props.cancel}>Close</Button>
            {props.isResponseButtons && <div><Button variant="outlined" sx={{ margin: 0.5 }} onClick={() => handleReject(steps)}>Reject</Button>
              <Button variant="contained" sx={{ margin: 0.5 }} onClick={handleApprove}>Approve</Button></div>}
          </Box>
        </React.Fragment>
      </div>
    </Box>
  );
}