import { Chip, Grid, StepLabel, TextField, Typography, } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import { getLeaveApproverStatus, updateApproverStatus } from "./serviceHistory";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { idText } from "typescript";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import CustomizedNotification from "src/util/CustomizedNotification";
import moment, { Moment } from "moment";

function createData(data) {
  let convertData = data.map((post, index) => {
      return {
          id : post.id,
          status : post.status,
          approverName:post.employeeApproverName,
          date:moment(post.date).format("DD-MM-yyyy").toString()
      };
  });
  return convertData;
}

export default function ViewHistory(props) {
  const { details, isEmployeeDetails, isResponseButtons, cancel ,setleaveTYpeId} = props;

  const [dataSource, setdataSource] = useState([]);

  const steps = dataSource;

  const [leaveRequestId, setleaveRequestId] = useState("");

  const handleClickOpen = () => { };

  const [approved, setApproved] = useState([]);

  const [rejected, setRejected] = useState([]);

  const [activeStep, setActiveStep] = useState(approved.length);

  const [open, setOpen] = useState(false);

  const getLeaveApproverStatusData = (leaveRequestId) => {
    getLeaveApproverStatus(details.leaveRequestId).then((res: any) => {
      const value: {status:String,id:number,approverName:String,date:String}[] = createData(res.results.ApproverStatus);
        setdataSource(value.sort((a,b) => a.id - b.id));

        console.log("Value...." , value);

    const approvalStatusOriginal:String[] = value.filter((requestStatus) =>requestStatus.status != "PENDING" && requestStatus.status != "NEW")
    .map((approverStatus) => approverStatus.status);

    const approvalStatus = value.filter((requestStatus) => requestStatus.status == "APPROVED")
    .map((filteredStatus) => filteredStatus.status);

    setApproved(approvalStatus);
    setRejected(approvalStatusOriginal);
    });
};



  const handleNext = () => {
    const newActiveStep = approved.length;
    setActiveStep(newActiveStep);
  };

  const handleApprove = () => {
    const newApproved = approved;
    console.log({details})
    // setApproved([...approved, "APPROVED"]);
    handleNext();
    let data: object = {
      id: dataSource[approved.length].id,
      statusId: 2,
    };
    console.log("STEPS...." + dataSource[approved.length].id);
    
    updateApproverStatus(data).then(
      (res: any) => {
        console.log(res);
          reloadTable(res);
      },
      (error) => {
        console.log(error);
        // reloadTable(res);
      }
    );
  };

  const handleAlertClose = () => {
    setalert({
      type: "",
      mesg: "",
    });
  };

  const [alert, setalert] = useState({
    type: "",
    mesg: "",
  });

  const handleError = (res) => {
    setalert({
      type: NOTIFICATION_TYPE.error,
      mesg: res.data.validationFailures[0].message,
    });
  };

  const reloadTable = (res) => {
    setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });
    getLeaveApproverStatusData(leaveRequestId);
    setOpen(false);
  };

  const handleReject = () => {
    // setRejected([...approved, "REJECTED"]);

    let data: object = {
      id: dataSource[approved.length].id,
      statusId: 3,
    };
    console.log("STEPS...." + dataSource[approved.length].id);
    
    updateApproverStatus(data).then(
      (res: any) => {
        console.log(res);
        reloadTable(res);
      },
      (error) => {
        console.log(error);
        // reloadTable(res);
      }
    );
  };

  const isStepFailed = (step: number) => {
    return step === rejected.indexOf("REJECTED");
  };

  function RejectIcon() {
    return (
      <CloseRoundedIcon
        style={{ color: "white", borderRadius: "50%", backgroundColor: "red" }}
      />
    );
  }

  const [comment, setComment] = React.useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    getLeaveApproverStatusData(setleaveTYpeId);
    console.log("setleaveTYpeId",setleaveTYpeId);
  }, []);

  console.log("DataSource...." , dataSource);
  console.log("Steps...." , steps);
  console.log("Approved.... " , approved);
  console.log("Rejected.... " , rejected);
  
  


  return (
    <Box sx={{ width: "600px" }}>
     
      <Stepper
        sx={{ backgroundColor: "White" }}
        activeStep={approved.length}
        alternativeLabel
      >
        {steps.map((label, index) => {
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
            StepIconComponent?: any;
          } = {};
          if (isStepFailed(index)) {
            labelProps.error = true;
            labelProps.StepIconComponent = RejectIcon;
          }

          return (
            <Step key={label.approverName} completed={approved[index]}>
              <StepLabel {...labelProps}>{label.approverName} <br/>{ (label.status == "APPROVED" || label.status == "REJECTED") ? <Typography variant="subtitle1">{label.date}</Typography> : !rejected.includes("REJECTED") ? <Typography variant="subtitle1">Pending</Typography> : ""}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        <Grid container>
          <Grid item xs={4}></Grid>
          <Box>
            {props.isEmployeeDetail && (
              <div>
                <Typography variant="h6" color="textSecondary" display="inline">
                  Name
                </Typography>
                <Typography
                  variant="h6"
                  color="black"
                  display="inline"
                  marginLeft="80px"
                >
                  {details.firstName}
                </Typography>
              </div>
            )}
            <div>
              <Typography variant="h6" color="textSecondary" display="inline">
                Leave Type
              </Typography>
              <Typography
                variant="h6"
                color="black"
                display="inline"
                marginLeft="46px"
              >
                {details.leaveType}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="textSecondary" display="inline">
                Leave days
              </Typography>
              <Typography
                variant="h6"
                color="black"
                display="inline"
                marginLeft="47px"
              >
                {details.leaveDays}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="textSecondary" display="inline">
                From date
              </Typography>
              <Typography
                variant="h6"
                color="black"
                display="inline"
                marginLeft="52px"
              >
                {details.fromDate}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="textSecondary" display="inline">
                To date
              </Typography>
              <Typography
                variant="h6"
                color="black"
                display="inline"
                marginLeft="71px"
              >
                {details.toDate}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="textSecondary" display="inline">
                Reason
              </Typography>
              <Typography
                variant="h6"
                color="black"
                display="inline"
                marginLeft="72px"
              >
                {details.reason}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="textSecondary" display="inline">
                Requested date
              </Typography>
              <Typography
                variant="h6"
                color="black"
                display="inline"
                marginLeft="15px"
              >
                {details.requestedDate}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="textSecondary" display="inline">
                Status
              </Typography>
              <Typography
                variant="h6"
                color="black"
                display="inline"
                marginLeft="79px"
              >
                {steps.length == rejected.length ||
                rejected.includes("REJECTED")
                  ? (rejected[rejected.length - 1] == "APPROVED" ? <Chip label="APPROVED" color="success" size="small" /> : <Chip label="REJECTED" color="error" size="small" />)
                  : <Chip label="PENDING" color="warning" size="small" />}
              </Typography>
            </div>
            {rejected.includes("REJECTED") && (
              <div>
                <Typography variant="h6" color="textSecondary" display="inline">
                  Comment
                </Typography>
                <Typography
                  variant="h6"
                  color="black"
                  display="inline"
                  marginLeft="54px"
                >
                  {details.comment}
                </Typography>
              </div>
            )}
          </Box>
        </Grid>
        {props.isResponseButtons && (
          <Box sx={{ textAlign: "Center", margin: "15px 0 5px 0" }}>
            <TextField
              sx={{ width: "250px" }}
              id="comment"
              label="Comment"
              multiline
              maxRows={2}
              value={comment}
              onChange={handleChange}
            />
          </Box>
        )}

        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button variant="text" sx={{ margin: 0.5 }} onClick={props.cancel}>
              Close
            </Button>
            {props.isResponseButtons && (
              <div>
                { (rejected.includes("REJECTED") || rejected.length == steps.length) ? 
                <Button
                variant="outlined"
                sx={{ margin: 0.5 }}
                onClick={handleReject}
                disabled
              >
                Reject
              </Button> :
              <Button
              variant="outlined"
              sx={{ margin: 0.5 }}
              onClick={handleReject}
            >
              Reject
            </Button>}
                
                { (rejected.includes("REJECTED") || rejected.length == steps.length)  ? 
                <Button
                variant="contained"
                sx={{ margin: 0.5 }}
                onClick={handleApprove}
                disabled
              >
                Approve
              </Button> : 
              <Button
              variant="contained"
              sx={{ margin: 0.5 }}
              onClick={handleApprove}
            >
              Approve
            </Button>}
              </div>
            )}
          </Box>
          {alert.type.length > 0 ? (
              <CustomizedNotification
              severity={alert.type}
              message={alert.mesg}
              handleAlertClose={handleAlertClose}
            />
            ) : null}
            {alert.type.length > 0 ? (
              <CustomizedNotification
              severity={alert.type}
              message={alert.mesg}
              handleAlertClose={handleAlertClose}
            />
            ) : null}
        </React.Fragment>
      </div>
    </Box>
  );
}
