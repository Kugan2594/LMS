import { Card, CardContent, Container, Divider, Grid } from "@mui/material";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import DoughnutChart from "src/components/molecules/Charts/Doughnut";
import { useEffect, useState } from "react";
import {
  getEmployeeleavetypeByEmployeeId,
  getAllEmployee,
} from "./ServiceAllocationDays";
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

function ManageAllocateDay() {
  const [updateStatus, setupdateStatus] = useState(true);
  const [employeeId, setemployeeId] = useState("");
  const [employeedata, setemployeedata] = useState([]);
  const [employee, setemployee] = useState([]);

  const onValueChange = (e) => {
    setupdateStatus(false);
    const { name, value } = e.target;
    if (name === "employee") {
      setemployeeId(value);
      getEmployeeNameSelectData(value);
    }
  };

  // get All Employee
  useEffect(() => {
    getAllEmployeeData();
  }, []);

  const getAllEmployeeData = () => {
    let data: any = [];
    getAllEmployee().then(
      (res: []) => {
        res.map((post: any) => {
          data.push({ id: post.id, title: post.lastName });
          return null;
        });
        setemployee(data);
      },
      (error) => {
        setemployee([]);
      }
    );
  };

  // get by Employee Id
  useEffect(() => {
    getEmployeeNameSelectData(employeeId);
  }, [employeeId]);

  const getEmployeeNameSelectData = (employeeId) => {
    let data: any = [];

    getEmployeeleavetypeByEmployeeId(employeeId).then(
      (res: []) => {
        data = createData(res);
        setemployeedata(data);
      },
      (error) => {
        setemployeedata([]);
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
                  name="employee"
                  label="Employee Name"
                  value={employeeId}
                  onValueChange={onValueChange}
                  options={employee}
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
                {employeedata.map((post, index) => {
                  return (
                    <Grid item xs={12} md={6} lg={3} key={index}>
                      <DoughnutChart
                        selectedValue={post.remainingDays}
                        maxValue={post.allocatedDays === 0 ? 100 : post.allocatedDays}
                        radius={75}
                        activeStrokeColor="#0f4fff"
                        withGradient
                        title="annual"
                      />
                      <CardContent>
                        <Grid item xs={12} md={12} lg={12} key={index}>
                          <h4>
                            {post.leaveType} - [{post.allocatedDays}]
                          </h4>
                        </Grid>
                      </CardContent>
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default ManageAllocateDay;
