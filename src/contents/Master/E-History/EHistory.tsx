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
    Grid,
    Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import Tables from "src/components/atoms/Tables";
import { Column } from "src/components/atoms/Tables/TableInterface";
import { minWidth } from "@mui/system";
import { getAllEmployeeLeaveHistory } from "./ServiceEmployeeHistory";
import ViewHistory from "../History/ViewHistory";
import moment from "moment";
import AutocompleteSelect from "src/components/atoms/controlls/AutocompleteSelect";
import {
    getAllEmployee,
    getEmployeeleavetypeByEmployeeId,
} from "../AllocationDays/ServiceAllocationDays";

function createData(data) {
    let convertData = data.map((post, index) => {
        return {
            id: post.id,
            type: post.leaveRequest.employeeLeaveType.leaveType.type,
            leaveDays: post.leaveRequest.leaveDays,
            fromDate: moment(post.leaveRequest.fromDate).format("YYYY-MM-DD"),
            toDate: moment(post.leaveRequest.toDate).format("YYYY-MM-DD"),
            requestedDate: moment(post.leaveRequest.requestedDate).format(
                "YYYY-MM-DD"
            ),
            status: post.status.status,
        };
    });
    return convertData;
}

function EHistory() {
    const [pagination, setpagination] = useState({
        pageNumber: 0,
        pageSize: 10,
        total: 0,
    });
    const [employeeId, setemployeeId] = useState("");
    const [open, setOpen] = useState(false);
    const [updateStatus, setupdateStatus] = useState(true);
    const [employeedata, setemployeedata] = useState([]);
    const [employee, setemployee] = useState([]);
    const [leaveDetails, setLeaveDetails] = useState({});

    const handleClickOpen = (value) => {
        setOpen(true);
        setLeaveDetails(value);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const onChangePage = (pageNumber, pageSize) => {};

    const [dataSource, setdataSource] = useState([]);

    useEffect(() => {
        getAllEmployeeLeaveHistoryData(
            pagination.pageNumber,
            pagination.pageSize,
            employeeId
        );
        getEmployeeNameSelectData(employeeId);
        getAllEmployeeData();
    }, [pagination.pageNumber, pagination.pageSize, employeeId]);

    const getAllEmployeeLeaveHistoryData = (
        pageNumber,
        pageSize,
        employeeId
    ) => {
        getAllEmployeeLeaveHistory(pageNumber, pageSize, employeeId).then(
            (res: any) => {
                let data: [] = createData(res.results.leaveHistory);
                setpagination({
                    pageNumber: res.pagination.pageNumber,
                    pageSize: res.pagination.pageSize,
                    total: res.pagination.totalRecords,
                });
                setdataSource(data);
            }
        );
    };

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

    // dropdown
    const onValueChange = (e) => {
        setupdateStatus(false);
        const { name, value } = e.target;
        if (name === "employee") {
            setemployeeId(value);
            getEmployeeNameSelectData(value);
        }
    };

    const columns: Column[] = [
        {
            id: "type",
            label: "Leave type",
            minWidth: 60,
        },
        {
            id: "leaveDays",
            label: "Leave days",
            minWidth: 60,
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
            id: "status",
            label: "Status",
            minWidth: 80,
        },
        {
            id: "action",
            label: "",
            minWidth: 40,
            render: (value: any) => (
                <Button variant="text" onClick={() => handleClickOpen(value)}>
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
            <PageTitleWrapper>
                <PageTitle
                    heading="History"
                    name=""
                    subHeading="Master/History"
                    isButton={false}
                />
            </PageTitleWrapper>
            <Divider />
            <br />

            <Container maxWidth="lg">
                <Card>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        maxWidth={550}
                        marginLeft={31}
                        padding={2}
                    >
                        <AutocompleteSelect
                            name="employee"
                            label="Employee Name"
                            value={employeeId}
                            onValueChange={onValueChange}
                            options={employee}
                        />
                    </Grid>
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
                                isEmployeeDetail={false}
                                isResponseButtons={false}
                                cancel={handleClose}
                            />
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </Container>
        </div>
    );
}

export default EHistory;
