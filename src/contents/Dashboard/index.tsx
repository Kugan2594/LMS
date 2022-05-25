import React, { useState, useEffect } from "react";
import { Card, CardContent, Container, Divider, Grid } from "@mui/material";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import DoughnutChart from "src/components/molecules/Charts/Doughnut";
import "react-circular-progressbar/dist/styles.css";
import ManageInProgress from "../Master/History/ManageInProgress";
import { getAllEmployeeLeaveType } from "../Master/AllocationDays/ServiceAllocatedDays";

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

    return (
        <>
            <div>
                <PageTitleWrapper>
                    <PageTitle
                        heading="Allocation Days"
                        subHeading="Master"
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
                                    marginTop={3}
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
                                                <DoughnutChart
                                                    selectedValue={
                                                        post.remainingDays
                                                    }
                                                    maxValue={
                                                        post.allocatedDays
                                                    }
                                                    radius={75}
                                                    activeStrokeColor="#0f4fff"
                                                    withGradient
                                                    title="annual"
                                                />

                                                <CardContent>
                                                    <Container>
                                                        <h4>
                                                            {post.leaveType}
                                                        </h4>
                                                    </Container>
                                                </CardContent>
                                            </Grid>
                                        );
                                    })}
                                    {/* ))} */}
                                </Grid>
                            </Container>
                        </CardContent>
                    </Card>
                </Container>
            </div>
            <div>
                <ManageInProgress />
            </div>
        </>
    );
}
