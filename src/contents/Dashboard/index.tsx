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

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div>
                <Box marginLeft={3} marginTop={2}>
                    <Button
                        variant="contained"
                        startIcon={<SendRoundedIcon />}
                        onClick={handleOpen}
                    >
                        Apply Leave
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
                        modalTitle=""
                        modalWidth="70%"
                        open={open}
                        onClose={handleClose}
                        modalBody={
                            <LeaveRequestForm
                                isButton={true}
                                isButtonTwo={true}
                            />
                        }
                    />
                </div>
            </div>
        </>
    );
}
