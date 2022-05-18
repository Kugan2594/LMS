import { Card, CardContent, Container, Divider } from "@mui/material";
import React from "react";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";

function ManageEmployee() {
  const handleClickOpen = () => {};

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
          <CardContent></CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default ManageEmployee;
