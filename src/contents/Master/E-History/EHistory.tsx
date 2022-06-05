import {
    Button,
    Card,
    CardContent,
    Chip,
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
import { getAllEmployeeLeaveHistory, getAllEmployeeLeaveHistoryByEmployee } from "./ServiceEmployeeHistory";
import ViewHistory from "../History/ViewHistory";
import moment from "moment";
import AutocompleteSelect from "src/components/atoms/controlls/AutocompleteSelect";
import {
    getAllEmployee,
    getEmployeeleavetypeByEmployeeId,
} from "../AllocationDays/ServiceAllocationDays";

// function createData(data) {
//     let convertData = data.map((post, index) => {
//         return {
//             id: post.id,
//             type: post.leaveRequest.employeeLeaveType.leaveType.type,
//             leaveDays: post.leaveRequest.leaveDays,
//             fromDate: moment(post.leaveRequest.fromDate).format("YYYY-MM-DD"),
//             toDate: moment(post.leaveRequest.toDate).format("YYYY-MM-DD"),
//             requestedDate: moment(post.leaveRequest.requestedDate).format(
//                 "YYYY-MM-DD"
//             ),
//             status: post.status.status,
//             leaveType: post.leaveRequest.employeeLeaveType.leaveType.type,
//             reason: post.leaveRequest.reason,
//             leaveRequestId: post.leaveRequest.id,
//         };
//     });
//     return convertData;
// }

function createData(data) {
    let convertData = data.map((post, index) => {
      return {
        id: post.id,
        status: post.status,
        approverName: post.employeeApproverName,
        date: moment(post.date).format("DD-MM-yyyy"),
        reason: post.reason,
        fromDate: moment(post.fromDate).format("DD-MM-yyyy"),
        toDate: moment(post.toDate).format("DD-MM-yyyy"),
        leaveDays: post.leaveDays,
        requestedDate: moment(post.requestedDate).format("DD-MM-yyyy"),
        leaveType: post.type,
        lastName: post.lastName,
        firstName: post.firstName,
        leaveRequestId: post.leaveRequestId,
      };
    });
    return convertData;
  }

function EHistory(props) {
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

    // useEffect(() => {
    //     getAllEmployeeLeaveHistoryData(
    //         pagination.pageNumber,
    //         pagination.pageSize,
    //         employeeId
    //     );
    //     getEmployeeNameSelectData(employeeId);
    //     getAllEmployeeData();
    // }, [pagination.pageNumber, pagination.pageSize, employeeId]);

    // const getAllEmployeeLeaveHistoryData = (
    //     pageNumber,
    //     pageSize,
    //     employeeId
    // ) => {
    //     getAllEmployeeLeaveHistory(pageNumber, pageSize, employeeId).then(
    //         (res: any) => {
    //             let data: {id:Number,status:String,approverName:String,date:String,reason:String,fromDate:String,toDate:String,leaveDays:Number,
    //                 requestedDate:String,leaveType:String,lastName:String,firstName:String,leaveRequestId:Number}[] = createData(res.results.leaveHistory);
    //             setpagination({
    //                 pageNumber: res.pagination.pageNumber,
    //                 pageSize: res.pagination.pageSize,
    //                 total: res.pagination.totalRecords,
    //             });
    //             setdataSource(data.filter((request) => request.status == "APPROVED" || request.status == "REJECTED").map((filtered) => filtered));
    //         }
    //     );
    // };

    useEffect(() => {
        getAllLeaveRequestHistoryData(
            pagination.pageNumber,
            pagination.pageSize,
            employeeId
        );
        getEmployeeNameSelectData(employeeId);
        getAllEmployeeData();
    }, [pagination.pageNumber, pagination.pageSize, employeeId]);
    
      const getAllLeaveRequestHistoryData = (
          pageNumber, 
          pageSize, 
          employeeId
          ) => {
        getAllEmployeeLeaveHistoryByEmployee(pageNumber, pageSize, employeeId).then(
            (res: any) => {
            let data: {id:Number,status:String,approverName:String,date:String,reason:String,fromDate:String,toDate:String,leaveDays:Number,
                requestedDate:String,leaveType:String,lastName:String,firstName:String,leaveRequestId:Number}[] = createData(res.results.leaveHistoryByEmployee);
            setpagination({
                pageNumber: res.pagination.pageNumber,
                pageSize: res.pagination.pageSize,
                total: res.pagination.totalRecords,
                });
                setdataSource(data.filter((request) => request.status == "APPROVED" || request.status == "REJECTED").map((filtered) => filtered));
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
            id: "leaveType",
            label: "Leave type",
            minWidth: 0,
        },
        {
            id: "fromDate",
            label: "From",
            minWidth: 0,
        },
        {
            id: "toDate",
            label: "To",
            minWidth: 0,
        },
        {
            id: "leaveDays",
            label: "Leave days",
            minWidth: 0,
        },
        {
            id: "requestedDate",
            label: "Requested date",
            minWidth: 0,
        },
        {
            id: "status",
            label: "Status",
            minWidth: 0,
            render: (value: any) =>
                value.status == "APPROVED" ? (
                    <Chip label="APPROVED" color="success" size="small" />
                ) : value.status == "REJECTED" ? (
                    <Chip label="REJECTED" color="error" size="small" />
                ) : (
                    <Chip label="PENDING" color="warning" size="small" />
                ),
        },
        {
            id: "details",
            label: "",
            minWidth: 0,
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
            {props.isTitle && (
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
                        Leave History
                    </Typography>
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
