import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Tabs,
  Typography,
} from "@mui/material";
import DoughnutChart from "src/components/molecules/Charts/Doughnut";
import { getAllEmployeeLeaveType } from "../Master/AllocationDays/ServiceAllocatedDays";
import ManageTask from "../Master/Tasks/ManageTask";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Modals from "src/components/atoms/Modals";
import LeaveRequestForm from "../Master/LeaveRequest/LeaveRequestForm";
import InProgress from "../Master/LeaveRequest/InProgress";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AddLieuRequest from "../Master/LieuRequest/AddLieuRequest";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import EHistory from "../Master/E-History/EHistory";
import ManageNotification from "../Master/Notification/ManageNotification";
import {
  getEmployeeIdByEmail,
  getApprovalStatusById,
} from "./ServiceEmployeeLeaveRequestHistory";
import { getUserDetails } from "../login/LoginAuthentication";
function createData(data) {
  let convertData = data.map((post, index) => {
    return {
      allocatedDays: post.allocatedDays,
      remainingDays: post.remainingDays,
      leaveType: post.leaveType.type,
    };
  });
  return convertData;
}

export default function Dashboard() {
  const [dataSource, setdataSource] = useState([]);
  const [employeeId, setEmployeeId] = useState(0);
  const [approvalstatus, setApprovalStatus] = useState();
  useEffect(() => {
    getEmployeeByEmail(getUserDetails().user_name);
    getAllEmployeeLeaveTypeData(getUserDetails().user_name);
  }, []);
  const getEmployeeByEmail = (email) => {
    getEmployeeIdByEmail(email).then((res: any) => {
      setEmployeeId(res.employee.id);
      getApprovalStatusById(res.employee.id).then((res: any) => {
        setApprovalStatus(res.results.Employee.approverStatus);
      });
    });
  };

  const getAllEmployeeLeaveTypeData = (email) => {
    getEmployeeIdByEmail(email).then((res: any) => {
      console.log("res", res);
      console.log("tttttttttttttttttttt", res.employee.id);

      getAllEmployeeLeaveType(res.employee.id).then((res: any) => {
        let data: [] = createData(res.results.getEmployeeleavetypeByEmployeeId);
        console.log("3333333333333333333333333", data);
        setdataSource(data);
      });
    });
  };

  const reload = () => {
    getAllEmployeeLeaveTypeData(getUserDetails().user_name);
  };

  const [openLeave, setOpenLeave] = useState(false);
  const [openLieu, setOpenLieu] = useState(false);

  const handleOpenLeave = () => {
    setOpenLeave(true);
  };

  const handleOpenLieu = () => {
    setOpenLieu(true);
  };

  const handleClose = () => {
    setOpenLeave(false);
    setOpenLieu(false);
  };
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <div>
        <Box sx={{ width: "100%" }}>
          <TabContext value={value}>
            <Box>
              <Tabs
                value={value}
                centered
                orientation="horizontal"
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
              >
                <Tab label="My Leaves" value="1" onClick={reload} />
                {approvalstatus && (
                  <Tab label="My Tasks" value="2" onClick={reload} />
                )}
              </Tabs>
            </Box>
            <TabPanel value="1">
              <Box marginRight={3} textAlign="right">
                <Button
                  variant="contained"
                  startIcon={<SendRoundedIcon />}
                  onClick={handleOpenLeave}
                >
                  Apply Leave
                </Button>
                {/* <Button
                  sx={{ marginLeft: "20px" }}
                  variant="contained"
                  startIcon={<AddCircleOutlineRoundedIcon />}
                  onClick={handleOpenLieu}
                >
                  Lieu Request
                </Button> */}
              </Box>
              <Container maxWidth="lg">
                <Card sx={{ marginTop: 3 }}>
                  <CardContent>
                    <Container>
                      <Grid
                        container
                        spacing={3}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        marginTop={1}
                      >
                        {dataSource.map((post, index) => {
                          return (
                            <Grid item xs={12} md={6} lg={3} key={index}>
                              <Box
                                sx={{
                                  textAlign: "center",
                                }}
                              >
                                <DoughnutChart
                                  radius={60}
                                  strokeWidth={12}
                                  activeStrokeColor="#1a8cff"
                                  selectedValue={post.remainingDays}
                                  maxValue={
                                    post.allocatedDays === 0
                                      ? 100
                                      : post.allocatedDays
                                  }
                                  withGradient
                                />

                                <Typography variant="h6" marginTop={"10px"}>
                                  {post.leaveType}
                                </Typography>
                                <Typography variant="subtitle1">
                                  total {post.allocatedDays}
                                </Typography>
                              </Box>
                            </Grid>
                          );
                        })}
                        {/* ))} */}
                      </Grid>
                    </Container>
                  </CardContent>
                </Card>
              </Container>

              <div>
                <InProgress isTitle={false} />
              </div>
              <Box marginBottom={3}>
                <div>
                  <EHistory isTitle={false} />
                </div>
              </Box>

              <div>
                <Modals
                  modalTitle="Apply Leave"
                  modalWidth="50%"
                  open={openLeave}
                  onClose={handleClose}
                  modalBody={
                    <LeaveRequestForm isButton={true} isButtonTwo={true} />
                  }
                />
              </div>
              <div>
                <Modals
                  modalTitle="Lieu Request"
                  modalWidth="25%"
                  open={openLieu}
                  onClose={handleClose}
                  modalBody={<AddLieuRequest />}
                />
              </div>
            </TabPanel>
            <TabPanel value="2">
              <Box marginTop={3}>
                <div>
                  <ManageTask isTitle={false} />
                </div>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
}
