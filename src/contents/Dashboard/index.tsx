import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import DoughnutChart from "src/components/molecules/Charts/Doughnut";
import { getAllEmployeeLeaveType } from "../Master/AllocationDays/ServiceAllocatedDays";
import ManageTask from "../Master/Tasks/ManageTask";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Modals from "src/components/atoms/Modals";
import LeaveRequestForm from "../Master/LeaveRequest/LeaveRequestForm";
import ManageInProgress from "../Master/History/ManageInProgress";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AddLieuRequest from "../Master/LieuRequest/AddLieuRequest";

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
    useEffect(() => {
        getAllEmployeeLeaveTypeData();
    }, []);

    const getAllEmployeeLeaveTypeData = () => {
        getAllEmployeeLeaveType().then((res: any) => {
            let data: [] = createData(res);
            setdataSource(data);
        });
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

    return (
        <>
            <div>
                <Box marginLeft={3} marginTop={2}>
                    <Button
                        variant="contained"
                        startIcon={<SendRoundedIcon />}
                        onClick={handleOpenLeave}
                    >
                        Apply Leave
                    </Button>
                    <Button
                        sx={{marginLeft: "20px"}}
                        variant="contained"
                        startIcon={<AddCircleOutlineRoundedIcon />}
                        onClick={handleOpenLieu}
                    >
                        Lieu Request
                    </Button>
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
                                            <Grid
                                                item
                                                xs={12}
                                                md={6}
                                                lg={3}
                                                key={index}
                                            >
                                                <Box
                                                    sx={{ textAlign: "center" }}
                                                >
                                                    <DoughnutChart
                                                        radius={60}
                                                        strokeWidth={12}
                                                        activeStrokeColor="#1a8cff"
                                                        selectedValue={
                                                            post.remainingDays
                                                        }
                                                        maxValue={
                                                            post.allocatedDays
                                                        }
                                                        withGradient
                                                    />

                                                    <Typography
                                                        variant="h6"
                                                        marginTop={"10px"}
                                                    >
                                                        {post.leaveType}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        total{" "}
                                                        {post.allocatedDays}
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
                    <ManageInProgress />
                </div>
                <Box marginTop={3}>
                    <div>
                        <ManageTask isTitle={false} />
                    </div>
                </Box>
                <div>
                    <Modals
                        modalTitle="Apply Leave"
                        modalWidth="50%"
                        open={openLeave}
                        onClose={handleClose}
                        modalBody={
                            <LeaveRequestForm
                                isButton={true}
                                isButtonTwo={true}
                            />
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
            </div>
        </>
    );
}
