import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { Column } from "src/components/atoms/Tables/TableInterface";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import ViewHistory from "../History/ViewHistory";
import InProgress from "../LeaveRequest/InProgress";
import LeaveRequestForm from "../LeaveRequest/LeaveRequestForm";
import { getAllLeaveRequest } from "../LeaveRequest/ServiceLeaveRequest";

function createData(data) {
    let convertData = data.map((post, index) => {
        return {
            id: post.id,
      employeeId: post.employeeId,
      reason: post.reason,
      fromDate: post.fromDate,
      toDate: post.toDate,
      leaveDays: post.leaveDays,
      requestedDate: post.requestedDate,
      leaveType: post.employeeLeaveType.leaveType.type,
      firstName: post.employee.firstName,
      lastName: post.employee.lastName,
      approvers: [],
        };
    });
    return convertData;
}
let mockData = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "Kuganesan Kuganesan",
    leaveType: "Annual",
    leaveDays: 14,
    reason: "Wedding",
    fromDate: "02/06/2022",
    toDate: "15/06/2022",
    requestedDate: "19/05/2022",
    status: "Approved",
    approvers: [
      { names: "KugApp1", appStatus: "Approved" },
      { names: "KugApp2", appStatus: "Approved" },
      { names: "KugApp3", appStatus: "Approved" },
    ],
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: "Cudeson Cudeson",
    leaveType: "Annual",
    leaveDays: 7,
    reason: "Wedding",
    fromDate: "02/06/2022",
    toDate: "09/06/2022",
    requestedDate: "18/05/2022",
    status: "Rejected",
    approvers: [
      { names: "CudApp1", appStatus: "Approved" },
      { names: "CudApp2", appStatus: "Approved" },
      { names: "CudApp3", appStatus: "Rejected" },
      { names: "CudApp4", appStatus: "Pending" },
    ],
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: "Kuganesan Kuganesan",
    leaveType: "Annual",
    leaveDays: 14,
    reason: "Wedding",
    fromDate: "02/06/2022",
    toDate: "15/06/2022",
    requestedDate: "19/05/2022",
    status: "Approved",
    approvers: [
      { names: "KugApp1", appStatus: "Approved" },
      { names: "KugApp2", appStatus: "Approved" },
      { names: "KugApp3", appStatus: "Approved" },
    ],
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: "Cudeson Cudeson",
    leaveType: "Annual",
    leaveDays: 7,
    reason: "Wedding",
    fromDate: "02/06/2022",
    toDate: "09/06/2022",
    requestedDate: "18/05/2022",
    status: "Rejected",
    approvers: [
      { names: "CudApp1", appStatus: "Approved" },
      { names: "CudApp2", appStatus: "Approved" },
      { names: "CudApp3", appStatus: "Pending" },
      { names: "CudApp4", appStatus: "Pending" },
    ],
  },
];

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
  const [sortField, setsortField] = React.useState({
    sortField: "id",
    direction: "DESC",
  });
  const [update, setUpdate] = useState(false);
  const handleUpdate = (value) => {
    setUpdate(true);
  };
  const handleUpdateClose = (value) => {
    setUpdate(false);
  };

  const [leaveDetails, setLeaveDetails] = useState({});

  const handleOpenLeaveDetails = (value) => {
    setOpenDetails(true);
    setLeaveDetails(value);
  };

  const handleClickOpen = (value) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDetails(false);
  };

  const onChangePage = (pageNumber, pageSize) => {};

  const onTableSearch = (values, sortField) => {};

  useEffect(() => {
    getAllLeaveRequestData(pagination.pageNumber, pagination.pageSize);
  }, [pagination.pageNumber, pagination.pageSize]);
  const getAllLeaveRequestData = (pageNumber, pageSize) => {
    getAllLeaveRequest(pageNumber, pageSize).then((res: any) => {
      let data: [] = createData(res.results.LeaveRequest);
      setpagination({
        pageNumber: res.pagination.pageNumber,
        pageSize: res.pagination.pageSize,
        total: res.pagination.totalRecords,
      });
      setdataSource(data);
    });
  };

  const columns: Column[] = [
    {
      id: "id",
      label: "Id",
      minWidth: 0,
    },
    {
      id: "lastName",
      label: "Employee Name",
      minWidth: 0,
    },
    {
      id: "leaveType",
      label: "LeaveType",
      minWidth: 0,
    },
    {
      id: "fromDate",
      label: "FromDate",
      minWidth: 0,
    },
    {
      id: "toDate",
      label: "ToDate",
      minWidth: 0,
    },
    {
      id: "reason",
      label: "Reason",
      minWidth: 0,
    },
    {
      id: "leaveDays",
      label: "Days",
      minWidth: 0,
    },
    // {
    //     id: "status",
    //     label: "Status",
    //     minWidth: 0,
    // },
    {
      id: "details",
      label: "",
      minWidth: 40,
      render: (value: any) => (
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
            My Tasks
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
