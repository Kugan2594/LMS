import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { Column } from "../../../components/atoms/Tables/TableInterface";
import AddEmployee from "../Employee/AddEmployee";
import { ILeaveRequest } from "./LeaveRequest.interface";
import { TableAction } from "src/components/atoms/Tables/TableAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LeaveRequest from "./LeaveRequest";
import LeaveRequestForm from "./LeaveRequestForm";
import ViewHistory from "../History/ViewHistory";

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
        approvers: [{names: "KugApp1", appStatus: "Approved"},
        {names: "KugApp2", appStatus: "Approved"}, 
        {names: "KugApp3", appStatus: "Approved"},],
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
        approvers: [{names: "CudApp1", appStatus: "Approved"},
        {names: "CudApp2", appStatus: "Approved"},
        {names: "CudApp3", appStatus: "Rejected"},
        {names: "CudApp4", appStatus: "Rejected"},],
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
        approvers: [{names: "KugApp1", appStatus: "Approved"},
        {names: "KugApp2", appStatus: "Approved"}, 
        {names: "KugApp3", appStatus: "Approved"},],
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
        approvers: [{names: "CudApp1", appStatus: "Approved"},
        {names: "CudApp2", appStatus: "Approved"},
        {names: "CudApp3", appStatus: "Approved"},
        {names: "CudApp4", appStatus: "Rejected"},],
      },
];

function InProgress() {
  const [pagination, setpagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    total: 0,
  });
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

  const columns: Column[] = [
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
    {
      id: "status",
      label: "Status",
      minWidth: 0,
    },
    {
      id: "details",
      label: "",
      minWidth: 40,
      render: (value) => (
        <Button
        variant="text"
        size="small"
        onClick={() => handleOpenLeaveDetails(value)}>
        Detail
      </Button>
      ),
    },
    {
      id: "cancel",
      label: "",
      render: (value: any) => (
        <Button
          variant="text"
          size="small"
          onClick={() => {
            handleClickOpen(value);
          }}
        >
          Cancel
        </Button>
      ),
      minWidth: 0,
    },
    {
      id: "update",
      label: "",
      render: (value: any) => (
        <Button
          variant="text"
          size="small"
          onClick={() => {
            handleUpdate(value);
          }}
        >
          Update
        </Button>
      ),
      minWidth: 0,
    },
  ];

  return (
    <div>
      <Container maxWidth="lg">
        <Card>
          <CardContent>
            <PageTitleWrapper>
              <PageTitle heading="In progress" isButton={false} />
            </PageTitleWrapper>
            <Divider />

            <Tables
              columns={columns}
              tableData={mockData}
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
        <Modals
          modalTitle="Update Leave Request"
          modalWidth="60%"
          open={update}
          onClose={handleUpdateClose}
          modalBody={<LeaveRequestForm isButton={true} isButtonThree={true} />}
        />
      </Container>
    </div>
  );
}

export default InProgress;
