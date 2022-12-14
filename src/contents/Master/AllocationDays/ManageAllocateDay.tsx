import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import DoughnutChart from "src/components/molecules/Charts/Doughnut";
import { useEffect, useState } from "react";
import {
  getEmployeeleavetypeByEmployeeId,
  getAllEmployee,
} from "./ServiceAllocationDays";
import AutocompleteSelect from "src/components/atoms/controlls/AutocompleteSelect";
import Modals from "src/components/atoms/Modals";
import AddAllocationDays from "./AddAllocationDays";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import CustomizedNotification from "src/util/CustomizedNotification";
import { EditOutlined } from "@mui/icons-material";
import Button from "src/components/atoms/controlls/Button";
import { getPermissionStatus, getSubordinatePrivileges, sampleFuc } from "src/util/permissionUtils";

function createData(data) {
  let convertData = data.map((post, index) => {
    return {
      id: post.id,
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
  const [action, setaction] = useState("add");
  const [open, setOpen] = useState(false);
  const [editData, seteditData] = useState({});

  const [alert, setalert] = useState({
    type: "",
    mesg: "",
  });

  const AllocateLeaves = getPermissionStatus("AllocateLeaves");
  console.log("AllocateLeaves", AllocateLeaves);
  const SubAllocateLeaves = getSubordinatePrivileges(AllocateLeaves, "AllocateLeaves");

  const handleAlertClose = () => {
    setalert({
      type: "",
      mesg: "",
    });
  };
  const handleClickOpen = () => {
    setaction("add");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const reloadTable = (res) => {
    setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });
    console.log("//////////////////////////", res);

    setOpen(false);
  };

  const editOnclick = (id) => {
    console.log(id);
    setaction("edit");
    seteditData(id);
    setOpen(true);
  };

  const handleError = (res) => {
    setalert({
      type: NOTIFICATION_TYPE.error,
      mesg: res.data.validationFailures[0].message,
    });
  };

  // dropdown
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
          data.push({ id: post.id, title: post.lastName + " " + post.firstName });
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
          heading="Allocate Leaves"
          subHeading="Master/Allocate Leaves"
          name="Allocate Leaves"
          // isButton={sampleFuc(SubAllocateLeaves).CRAL ? true : false}
          isButton={true}
          onclickButton={handleClickOpen}
        />
      </PageTitleWrapper>
      <Divider />
      <br />

      <Container maxWidth="lg">
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={4}>
                <AutocompleteSelect
                  name="employee"
                  label="Employee Name"
                  value={employeeId}
                  onValueChange={onValueChange}
                  options={employee}
                />
              </Grid>
            </Grid>

            <Container>
              <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="center"
                marginTop={3}
              >
                {employeedata.map((post, index) => {
                  return (
                    <Grid item xs={12} md={6} lg={3} key={index}>
                      <Box sx={{ textAlign: "center" }}>
                        <DoughnutChart
                          selectedValue={post.remainingDays}
                          maxValue={
                            post.allocatedDays === 0||0.5 ? 100 : post.allocatedDays
                          }
                          radius={60}
                          strokeWidth={12}
                          activeStrokeColor="#1a8cff"
                          withGradient
                          title="annual"
                        />
                        <Typography variant="h6" marginTop={"10px"}>
                          {post.leaveType}
                        </Typography>
                        <Typography variant="subtitle1">
                          total {post.allocatedDays}
                        </Typography>
                        {/* Hold update */}
                        {/* <Button onClick={()=>editOnclick(post.id)} variant="outlined" text="Edit"></Button> */}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
            <br />
            <Modals
              modalTitle={
                action === "edit"
                  ? "Edit Employee Allocation Days"
                  : "Add Employee Allocation Days"
              }
              modalWidth="40%"
              open={open}
              // onClose={handleClose}
              modalBody={
                <AddAllocationDays
                  reloadTable={reloadTable}
                  action={action}
                  editData={editData}
                  handleError={handleError}
                  handleClose={handleClose}
                />
              }
            />
          </CardContent>
        </Card>
      </Container>
      {alert.type.length > 0 ? (
        <CustomizedNotification
          severity={alert.type}
          message={alert.mesg}
          handleAlertClose={handleAlertClose}
        />
      ) : null}
    </div>
  );
}

export default ManageAllocateDay;
