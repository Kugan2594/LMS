import { Card, CardContent, Container, Divider } from "@mui/material";
import React, { useState } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { Column } from "../../../components/atoms/Tables/TableInterface";
import AddEmployee from "./AddEmployee";

let mockData = [
  {
    id: 0,
    name: "Ajith",
    address: "Jaffna",
  },
  {
    id: 1,
    name: "Codesan",
    address: "Jaffna",
  },
];

function ManageEmployee() {
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
      id: "address",
      label: "Address",
      minWidth: 180,
    },
  ];

  return (
    <div>
      <PageTitleWrapper>
        <PageTitle
          heading="Employee"
          name="Add Employee"
          subHeading="Master/Employee"
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
          modalTitle="Add Employee"
          modalWidth="25%"
          open={open}
          onClose={handleClose}
          modalBody={<AddEmployee />}
        />
      </Container>
    </div>
  );
}

export default ManageEmployee;
