import {
    Button,
    Card,
    CardContent,
    Container,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import Tables from "src/components/atoms/Tables";
import { Column } from "src/components/atoms/Tables/TableInterface";
import Modals from "src/components/atoms/Modals";
import ViewHistory from "./ViewHistory";
import { getAllEmployeeLeaveRequestHistory } from "src/contents/Dashboard/ServiceEmployeeLeaveRequestHistory";
import moment from "moment";

function createData(data) {
    let convertData = [];
    data.map((post, index) => {
        if (post.status.status === "NEW") {
            convertData.push({
                firstName: post.employeeApprover.approver.employee.firstName,
                type: post.leaveRequest.employeeLeaveType.leaveType.type,
                leaveDays: post.leaveRequest.leaveDays,
                fromDate: moment(post.leaveRequest.fromDate).format(
                    "YYYY-MM-DD"
                ),
                toDate: moment(post.leaveRequest.toDate).format("YYYY-MM-DD"),
                requestedDate: moment(post.leaveRequest.requestedDate).format(
                    "YYYY-MM-DD"
                ),
                status: post.status.status,
            });
        }
    });
    return convertData;
}

export default function ManageInProgress(props) {
    const [dataSource, setdataSource] = useState([]);
    const [pagination, setpagination] = useState({
        pageNumber: 0,
        pageSize: 10,
        total: 0,
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const onChangePage = (pageNumber, pageSize) => {};

    useEffect(() => {
        getAllEmployeeLeaveHistoryData(
            pagination.pageNumber,
            pagination.pageSize
        );
    }, []);

    const getAllEmployeeLeaveHistoryData = (pageNumber, pageSize) => {
        getAllEmployeeLeaveRequestHistory(pageNumber, pageSize).then(
            (res: any) => {
                setdataSource(createData(res.results.leaveHistory));
                setpagination({
                    pageNumber: res.pagination.pageNumber,
                    pageSize: res.pagination.pageSize,
                    total: res.pagination.totalRecords,
                });
            }
        );
    };

    const [leaveDetails, setLeaveDetails] = useState({});

    const handleClickViewDetails = (value) => {
        setOpen(true);
        setLeaveDetails(value);
    };

    const columns: Column[] = [
        {
            id: "type",
            label: "Leave type",
            minWidth: 40,
        },
        {
            id: "leaveDays",
            label: "Leave days",
            align: "center",
            minWidth: 40,
        },
        {
            id: "fromDate",
            label: "From",
            minWidth: 100,
        },
        {
            id: "toDate",
            label: "To",
            minWidth: 100,
        },
        {
            id: "requestedDate",
            label: "Requested date",
            minWidth: 110,
        },
        {
            id: "details",
            label: "",
            render: (value) => (
                <Button
                    variant="text"
                    onClick={() => handleClickViewDetails(value)}
                >
                    Detail
                </Button>
            ),
        },
    ];

    const [searchFields, setsearchFields] = useState({ name: "" });
    const [sortField, setsortField] = React.useState({
        sortField: "id",
        direction: "DESC",
    });

    const onTableSearch = (values, sortField) => {};

    return (
        <div>
            {props.isTitle && (
                <div>
                    <PageTitleWrapper>
                        <PageTitle
                            heading="InProgress Leave Requests"
                            name="Approval Status"
                            subHeading="Master"
                            isButton={true}
                            onclickButton={handleClickOpen}
                        />
                    </PageTitleWrapper>
                    <Divider />
                </div>
            )}
            <br />

            <Container maxWidth="lg">
                <Card>
                    <Typography
                        variant="h6"
                        margin="10px 0 0 20px"
                        color="#1a8cff"
                    >
                        In Progress leaves
                    </Typography>

                    <CardContent>
                        <Tables
                            columns={columns}
                            tableData={dataSource}
                            onChangePage={onChangePage}
                            pageNumber={pagination.pageNumber}
                            total={pagination.total}
                            pageSize={pagination.pageSize}
                            searchFields={{}}
                            onTableSearch={onTableSearch}
                        />
                    </CardContent>
                </Card>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="md"
                >
                    <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <ViewHistory
                                details={leaveDetails}
                                isEmployeeDetail={true}
                                isResponseButtons={true}
                                cancel={handleClose}
                            />
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </Container>
        </div>
    );
}
