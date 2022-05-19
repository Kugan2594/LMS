import { Card, CardContent, Container, Divider } from "@mui/material";
import React, { useState } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { Column } from "../../../components/atoms/Tables/TableInterface";

let mockData = [
  {
    id: 1,
    type: "Casual",
    noticePeriod: 2,
    description:"this is casual leave"
  },
  {
    id: 2,
    type: "Anual",
    noticePeriod: 4,
    description:"this is anual leave"
  },
];

function ManageLeaveType() {
  const [pagination, setpagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    total: 0,
  });

  // const [open, setOpen] = useState(false);
  // const [searchFields, setsearchFields] = useState({ type: "" });
  // const [sortField, setsortField] = React.useState({
  //   sortField: "id",
  //   direction: "DESC",
  // });
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const onChangePage = (pageNumber, pageSize) => {};

  const onTableSearch = (values, sortField) => {};
  const columns: Column[] = [
    {
      id: "type",
      label: "Type",
      minWidth: 180,
    },
    {
      id: "noticePeriod",
      label: "Notice period",
      minWidth: 180,
    },
    {
      id: "description",
      label: "Description",
      minWidth: 180,
    }
  ];

  return (
    <div>
      <PageTitleWrapper>
        <PageTitle
          heading="Leave Type"
          // name="Add LeaveType"
          subHeading="Master/LeaveType"
          isButton={false}
          // onclickButton={handleClickOpen}
        />
      </PageTitleWrapper>
      <Divider />
      <br />

      <Container maxWidth="lg">
        <Card>
          <CardContent>
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
        {/* <Modals
          modalTitle="Add LeaveType"
          modalWidth="25%"
          open={open}
          onClose={handleClose}
          modalBody={<AddEmployee />}
        /> */}
      </Container>
    </div>
  );
}

export default ManageLeaveType;
