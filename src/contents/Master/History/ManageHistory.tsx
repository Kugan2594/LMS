import { Card, CardContent, Container, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import Tables from "src/components/atoms/Tables";
import { Column } from "src/components/atoms/Tables/TableInterface";
import Modals from "src/components/atoms/Modals";
import ViewHistory from "./ViewHistory";


let sampleData: any = [
  {
    id: 1,
    employeeId: "01",
    name: "Kuganesan Kuganesan",
    leaveType: "Annual",
    leaveDays: "14",
    fromDate: "02/06/2022",
    toDate: "15/06/2022",
    requestedDate: "19/05/2022",
    status: "Approved",
  },
  {
    id: 2,
    employeeId: "02",
    name: "Cudeson Cudeson",
    leaveType: "Annual",
    leaveDays: "7",
    fromDate: "02/06/2022",
    toDate: "09/06/2022",
    requestedDate: "18/05/2022",
    status: "Rejected",
  },
  {
    id: 3,
    employeeId: "03",
    name: "Kuganesan Kuganesan",
    leaveType: "Annual",
    leaveDays: "14",
    fromDate: "02/06/2022",
    toDate: "15/06/2022",
    requestedDate: "19/05/2022",
    status: "Approved",
  },
  {
    id: 4,
    employeeId: "04",
    name: "Cudeson Cudeson",
    leaveType: "Annual",
    leaveDays: "7",
    fromDate: "02/06/2022",
    toDate: "09/06/2022",
    requestedDate: "18/05/2022",
    status: "Rejected",
  },
]

function ManageHistory() {

  const [pagination, setpagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    total: 0,
  });

  const [open, setOpen] = useState(false);

  const [modelDetails, setModelDetails] = useState({});

  const handleClickOpen = (value) => {
    setOpen(true);
    setModelDetails(value);
  };

  console.log(modelDetails);

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
      id: "name",
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
      id: "action",
      label: "Action",
      minWidth: 40,
      render: (value) => (
        <Typography variant="inherit" onClick={()=>handleClickOpen(value)}
        color="blue" style={{cursor: "pointer"}} >Detail</Typography>
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
        <Modals
          modalTitle="Approval Status"
          modalWidth="50%"
          open={open}
          onClose={handleClose}
          modalBody={<ViewHistory details={modelDetails} />}
        />
      </Container>
    </div>
  );
}

export default ManageHistory;