import {
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import moment from "moment";
import React, { useState, useEffect } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { Column } from "src/components/atoms/Tables/TableInterface";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { getPermissionStatus, getSubordinatePrivileges, sampleFuc } from "src/util/permissionUtils";
import { getLeaveApproverStatus, getLeaveApproverStatusHistory } from "../History/serviceHistory";
import ViewHistory from "../History/ViewHistory";
import InProgress from "../LeaveRequest/InProgress";
import LeaveRequestForm from "../LeaveRequest/LeaveRequestForm";
import { getAllLeaveRequest } from "../LeaveRequest/ServiceLeaveRequest";

// function createData(data) {
//     let convertData = data.map((post, index) => {
//         return {
//             id: post.id,
//       employeeId: post.employee.id,
//       reason: post.reason,
//       fromDate: moment(post.fromDate).format("DD-MM-yyyy"),
//       toDate: moment(post.toDate).format("DD-MM-yyyy"),
//       leaveDays: post.leaveDays,
//       requestedDate: moment(post.requestedDate).format("DD-MM-yyyy"),
//       leaveType: post.employeeLeaveType.leaveType.type,
//       firstName: post.employee.firstName,
//       lastName: post.employee.lastName,
//       approvers: [],
//         };
//     });
//     return convertData;
// }

function createData(data) {
  let convertData = data.map((post, index) => {
    return {
      id: post.id,
      status: post.status,
      approverName: post.employeeApproverName,
      date: moment(post.date).format("DD-MM-yyyy"),
      reason: post.reason,
      fromDate: moment(post.fromDate).format("DD-MM-yyyy"),
      toDate: moment(post.toDate).format("DD-MM-yyyy"),
      leaveDays: post.leaveDays,
      requestedDate: moment(post.requestedDate).format("DD-MM-yyyy"),
      leaveType: post.type,
      lastName: post.lastName,
      firstName: post.lastName + " " + post.firstName,
      leaveRequestId: post.leaveRequestId,
    };
  });
  return convertData;
}




function Task(props) {
  const [pagination, setpagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    total: 0,
  });
  const [dataSource, setdataSource] = useState([]);
  const [setLeaveRequestData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [searchFields, setsearchFields] = useState({ name: "" });
  const [leaveTd, setLeaveId] = useState(0);
  const [sortField, setsortField] = React.useState({
    sortField: "id",
    direction: "DESC",
  });

  const ManageTask = getPermissionStatus("DashBoard");
  console.log("ManageTask", ManageTask);
  const SubManageTask = getSubordinatePrivileges(ManageTask, "DashBoard");
  console.log(" ManageTask .status", sampleFuc(SubManageTask));
  console.log("ADD ManageTask status", sampleFuc(SubManageTask).CRMT);


  const [update, setUpdate] = useState(false);
  const handleUpdate = (value) => {
    setUpdate(true);
  };
  const handleUpdateClose = (value) => {
    setUpdate(false);
  };

  const [leaveDetails, setLeaveDetails] = useState({});

  const handleOpenLeaveDetails = (value) => {
    console.log({ value })
    setOpenDetails(true);
    setLeaveDetails(value);
    setLeaveId(value.id);
  };

  const handleClickOpen = (value) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDetails(false);
    reloadTable();
  };

  const onChangePage = (pageNumber, pageSize) => { };

  const onTableSearch = (values, sortField) => { };

  // useEffect(() => {
  //   getAllLeaveRequestData(pagination.pageNumber, pagination.pageSize);

  // }, [pagination.pageNumber, pagination.pageSize]);
  // const getAllLeaveRequestData = (pageNumber, pageSize) => {
  //   getAllLeaveRequest(pageNumber, pageSize).then((res: any) => {
  //     let data: [] = createData(res.results.LeaveRequest);
  //     setpagination({
  //       pageNumber: res.pagination.pageNumber,
  //       pageSize: res.pagination.pageSize,
  //       total: res.pagination.totalRecords,
  //     });
  //     setdataSource(data);
  //   });
  // };

  useEffect(() => {
    getAllLeaveRequestHistoryData(pagination.pageNumber, pagination.pageSize);

  }, [pagination.pageNumber, pagination.pageSize]);

  const getAllLeaveRequestHistoryData = (pageNumber, pageSize) => {
    getLeaveApproverStatusHistory(pageNumber, pageSize).then((res: any) => {
      let value: {id:Number,status:String,approverName:String,date:String,reason:String,fromDate:String,toDate:String,leaveDays:Number,
        requestedDate:String,leaveType:String,lastName:String,firstName:String,leaveRequestId:Number}[] = createData(res.results.leaveHistory);
      setdataSource(value.filter((request) => request.status == "PENDING" || request.status == "NEW").map((filtered) => filtered));
    });
  };

  const reloadTable = () => {
    getAllLeaveRequestHistoryData(pagination.pageNumber, pagination.pageSize);
  }


  const columns: Column[] = [
    // {
    //   id: "id",
    //   label: "Id",
    //   minWidth: 0,
    // },
    {
      id: "firstName",
      label: "Employee Name",
      minWidth: 0,
    },
    {
      id: "leaveType",
      label: "Leave Type",
      minWidth: 0,
    },
    {
      id: "fromDate",
      label: "From Date",
      minWidth: 0,
    },
    {
      id: "toDate",
      label: "To Date",
      minWidth: 0,
    },
    {
      id: "leaveDays",
      label: "Leave Days",
      minWidth: 0,
    },
    {
      id: "reason",
      label: "Reason",
      minWidth: 0,
    },
    {
      id: "requestedDate",
      label: "Requested date",
      minWidth: 0,
  },
    {
      id: "status",
      label: "Status",
      minWidth: 0,
      render: (value: any) => (
         value.status == "APPROVED" ? <Chip label="APPROVED" color="success" size="small" /> : value.status == "REJECTED" ? <Chip label="REJECTED" color="error" size="small" /> : <Chip label="PENDING" color="warning" size="small" />
      )
    },
    {
      id: "details",
      label: "",
      minWidth: 40,
      render: (value: any) => (
          sampleFuc(SubManageTask).UPAS &&
          sampleFuc(SubManageTask).VIAS &&
        <Button
          variant="text"
          size="small"
          onClick={() => handleOpenLeaveDetails(value)}
        >
          Detail
        </Button>
      ),
    },
  ];

  return (
    <div>
      {props.isTitle && (
        <PageTitleWrapper>
          <PageTitle
            heading="My Task"
            subHeading="Master/My Task"
            isButton={false}
          />
        </PageTitleWrapper>
      )}
      <Container maxWidth="lg">
        <Card>
          <Typography variant="h6" margin="10px 0 0 20px" color="#1a8cff">
            My Approvals
          </Typography>
          <CardContent>
            <Tables
              columns={columns}
              tableData={dataSource}
              onChangePage={onChangePage}
              pageNumber={pagination.pageNumber}
              total={pagination.total}
              pageSize={pagination.pageSize}
              searchFields={{}}
              onTableSearch={onTableSearch}
            />
          </CardContent>
        </Card>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure Do you want to cancel Request?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={handleClose} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={openDetails}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <ViewHistory
                  details={leaveDetails}
                  isEmployeeDetail={true}
                  isResponseButtons={true}
                  cancel={handleClose}
                  setleaveTYpeId={leaveTd}
                />
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      </Container>
    </div>
  );
}

export default Task;
