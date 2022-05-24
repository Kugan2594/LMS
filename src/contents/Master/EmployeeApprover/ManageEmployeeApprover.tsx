import { Card, CardContent, Container, Divider } from "@mui/material";
import React, { useState } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { Column } from "../../../components/atoms/Tables/TableInterface";
import AddEmployeeApprover from "./AddEmployeeApprover";

let mockData = [
  {
    id: 0,
    name: "sajee",
    designation: "ASE",
  },
  {
    id: 1,
    name: "Codesan",
    address: "TL",
  },
];

function ManageEmployeeApprover() {
  const [pagination, setpagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    total: 0,
  });

  const [open, setOpen] = useState(false);
  const [searchFields, setsearchFields] = useState({ name: "" });
  const [sortField, setsortField] = React.useState({
    sortField: "id",
    direction: "DESC",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChangePage = (pageNumber, pageSize) => {};

  const onTableSearch = (values, sortField) => {};
  const columns: Column[] = [
    {
      id: "name",
      label: "Name",
      minWidth: 180,
    },
    {
      id: "designation",
      label: "Designation",
      minWidth: 180,
    },
  ];

  return (
    <div>
      <PageTitleWrapper>
        <PageTitle
          heading="Employee"
          name="Add EmployeeApprover"
          subHeading="Master/EmployeeApprover"
          isButton={true}
          onclickButton={handleClickOpen}
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
        <Modals
          modalTitle="Add EmployeeApprover"
          modalWidth="70%"
          open={open}
          onClose={handleClose}
          modalBody={<AddEmployeeApprover reloadTable={()=>console.log()} handleError={()=>console.log()} />}

        />
      </Container>
    </div>
  );
}

export default ManageEmployeeApprover;
