import {
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
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
          name="Add Employee Allocation Day"
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
                        maxValue={
                          post.allocatedDays === 0 ? 100 : post.allocatedDays
                        }
                        radius={80}
                        strokeWidth={12}
                        activeStrokeColor="#1a8cff"
                        withGradient
                        title="annual"
                      />
                      <CardContent>
                        <Grid item xs={12} md={12} lg={12} key={index}>
                          <h4>
                            {post.leaveType} - [{post.allocatedDays}]
                          </h4>
                          {/* Hold update */}
                          {/* <Button onClick={()=>editOnclick(post.id)} variant="outlined" text="Edit"></Button> */}
                        </Grid>
                      </CardContent>
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
              modalWidth="70%"
              open={open}
              onClose={handleClose}
              modalBody={
                <AddAllocationDays
                  reloadTable={reloadTable}
                  action={action}
                  editData={editData}
                  handleError={handleError}
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
