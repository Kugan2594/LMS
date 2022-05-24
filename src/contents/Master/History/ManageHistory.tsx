import { Card, CardContent, Container, Divider, Typography, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Button } from "@mui/material";
import React, { useState } from "react";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import Tables from "src/components/atoms/Tables";
import { Column } from "src/components/atoms/Tables/TableInterface";
import ViewHistory from "./ViewHistory";


let sampleData: any = [
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
    {names: "KugApp1", appStatus: "Approved"},
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
    approvers: [
    {names: "CudApp1", appStatus: "Approved"},
    {names: "CudApp2", appStatus: "Rejected"},
    {names: "CudApp3", appStatus: "Pending"},
    {names: "CudApp4", appStatus: "Pending"},],
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
    {names: "KugApp1", appStatus: "Approved"},
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
    approvers: [
        {names: "CudApp1", appStatus: "Approved"},
        {names: "CudApp2", appStatus: "Approved"},
        {names: "CudApp3", appStatus: "Pending"},
        {names: "CudApp4", appStatus: "Pending"},],
  },
]

function ManageHistory() {

  const [pagination, setpagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    total: 0,
  });

  const [open, setOpen] = useState(false);

  const [leaveDetails, setLeaveDetails] = useState({});

  const handleClickOpen = (value) => {
    setOpen(true);
    setLeaveDetails(value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChangePage = (pageNumber, pageSize) => {};

  const columns: Column[] = [
    {
      id: "employeeId",
      label: "ID",
      minWidth: 45,
    },
    {
      id: "employeeName",
      label: "Name",
      minWidth: 190,
    },
    {
      id: "leaveType",
      label: "Leave type",
      minWidth: 40,
    },
    {
      id: "leaveDays",
      label: "Leave days",
      align: "center",
      minWidth: 40,
    },
    {
      id : "fromDate",
      label: "From",
      minWidth: 100,
    },
    {
      id : "toDate",
      label: "To",
      minWidth: 100,
    },
    {
      id: "requestedDate",
      label: "Requested date",
      minWidth: 110,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 80,
    },
    {
      id: "details",
      label: "",
      minWidth: 40,
      render: (value) => (
        <Button variant="text" onClick={()=>handleClickOpen(value)}>Detail</Button>
        ),
    }
  ];
  
  const [searchFields, setsearchFields] = useState({ name: "" });
  const [sortField, setsortField] = React.useState({
    sortField: "id",
    direction: "DESC",
  });

  const onTableSearch = (values, sortField) => {};

  return (
    <div>
      <PageTitleWrapper>
        <PageTitle
          heading="History"
          subHeading="Master/History"
          isButton={false}
        />
      </PageTitleWrapper>
      <Divider />
      <br />

      <Container maxWidth="lg">
        <Card>
          <CardContent>
          <Tables
              columns={columns}
              tableData={sampleData}
              onChangePage={onChangePage}
              pageNumber={pagination.pageNumber}
              total={pagination.total}
              pageSize={pagination.pageSize}
              searchFields={{}}
              onTableSearch={onTableSearch}
          />
          </CardContent>
        </Card>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          {""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <ViewHistory details={leaveDetails} isEmployeeDetail={false} isResponseButtons={false} cancel={handleClose} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      </Container>
    </div>
  );
}

export default ManageHistory;