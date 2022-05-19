import { Card, CardContent, Container, Divider } from "@mui/material";
import React from "react";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";

function ManageHistory() {
  const handleClickOpen = () => {};

  return (
    <div>
      <PageTitleWrapper>
        <PageTitle
          heading="History"
          name=""
          subHeading="Master/History"
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

export default ManageHistory;