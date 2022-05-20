import { Card, CardContent, Container, Divider, Grid } from "@mui/material";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import DoughnutChart from "src/components/molecules/Charts/Doughnut";
import "react-circular-progressbar/dist/styles.css";

function ManageAllocateDay() {
  return (
    <div>
      <PageTitleWrapper>
        <PageTitle
          heading="Allocation Days"
          subHeading="Master/AllocateDay"
          isButton={false}
        />
      </PageTitleWrapper>
      <Divider />
      <br />

      <Container maxWidth="lg">
        <Card>
          <CardContent>
            <Container>
              <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="center"
                marginLeft={5}
                marginTop={2}
              >
                {Array.from(Array(4)).map((_, index) => (
                  <Grid item xs={12} md={6} lg={3} key={index}>
                    <DoughnutChart
                      selectedValue={5}
                      maxValue={15}
                      radius={75}
                      activeStrokeColor="#0f4fff"
                      withGradient
                      title="annual"
                    />
                    <CardContent>
                      <Container>
                      <h4>Leave Type</h4>
                      </Container>
                    </CardContent>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default ManageAllocateDay;
