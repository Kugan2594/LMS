import { Card, CardContent, Container, Divider, Grid } from "@mui/material";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import DoughnutChart from "src/components/molecules/Charts/Doughnut";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";
import { getEmployeeleavetypeByEmployeeId } from "./ServiceAllocationDays";
import { any, number } from "prop-types";
import AutocompleteSelect from "src/components/atoms/controlls/AutocompleteSelect";

function createData(data) {
  let convertData = data.map((post, index) => {
    return {
      id: post.id,
      firstName: post.employee.firstName,
      lastName: post.employee.lastName,
      type: post.leaveType.type,
      allocatedDays: post.allocatedDays,
      remainingDays: post.remainingDays,
    };
  });
  return convertData;
}

const employeeList = [
  {
    id: "Cudeson",
    title: "Cudeson",
  },
  {
    id: "Marujan",
    title: "Marujan",
  },
  {
    id: "Rushanthan",
    title: "Rushanthan",
  },
  {
    id: "Rishi",
    title: "Rishi",
  },
  {
    id: "Keerthana",
    title: "Keerthana",
  },
  {
    id: "Sajinthini",
    title: "Sajinthini",
  },
  {
    id: "Kuganesan",
    title: "Kuganesan",
  },
  {
    id: "Kuruparan",
    title: "Kuruparan",
  },
];

function ManageAllocateDay() {
  const [updateStatus, setupdateStatus] = useState(true);

  const onValueChange = (e) => {
    setupdateStatus(false);
    const { firstName, value } = e.target;
    console.log("hit", firstName, value);
  };

  const [dataSource, setdataSource] = useState([]);

  // useEffect(() => {
  //   getEmployeeleavetypeByEmployeeIdData(employeeId: any);
  // }, [employeeId: any]);
  // const getEmployeeleavetypeByEmployeeIdData = (employeeId) => {
  //   getEmployeeleavetypeByEmployeeId(employeeId).then((res: any) => {
  //     let data: [] = createData(res.results.Employee);
  //     setdataSource(data);
  //   });
  // };
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
            <Grid container>
              <Grid item xs={12} md={3} lg={3}></Grid>
              <Grid item xs={12} md={6} lg={6}>
                <AutocompleteSelect
                  name="firstName"
                  label="Employee Name"
                  onValueChange={onValueChange}
                  options={employeeList}
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3}></Grid>
            </Grid>

            <Container>
              <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="center"
                marginLeft={5}
                marginTop={3}
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
