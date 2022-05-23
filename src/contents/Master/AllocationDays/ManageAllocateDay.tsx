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
      allocatedDays: post.allocatedDays,
      remainingDays: post.remainingDays,
      leaveType: post.leaveType.type,
      employee: post.employee.firstName,
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
  const [employeeId, setemployeeId] = useState("");
  const [erroremployee, seterroremployee] = useState("");

  const onValueChange = (e) => {
    setupdateStatus(false);
    const { name, value } = e.target;
    if (name === "employeeId") {
      setemployeeId(value);
      if (value !== "") {
        seterroremployee("");
      }
    }
    console.log("hit", name, value);
  };

  const [dataSource, setdataSource] = useState([]);

  useEffect(() => {
    getEmployeeNameSelectData(2);
  }, []);

  const getEmployeeNameSelectData = (employeeId) => {
    let data: any = [];
    getEmployeeleavetypeByEmployeeId(employeeId).then(
      (res: []) => {
        res.map((post: any) => {
          data.push({ id: post.id, title: post.employee });
          return null;
        });
        setdataSource(data);
      },
      (error) => {
        console.log(error);
        setdataSource([]);
      }
    );
  };

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
                  name="employeeId"
                  label="Employee Name"
                  value={employeeId}
                  onValueChange={onValueChange}
                  options={dataSource}
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
