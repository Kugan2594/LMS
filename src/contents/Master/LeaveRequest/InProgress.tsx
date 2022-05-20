import {
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { Column } from "../../../components/atoms/Tables/TableInterface";
import AddEmployee from "../Employee/AddEmployee";
import { ILeaveRequest } from "./LeaveRequest.interface";
import { TableAction } from "src/components/atoms/Tables/TableAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

let mockData = [
    {
        leaveType: "Annual",
        fromDate: "05/18/2022",
        toDate: "05/18/2022",
        reason: "Foriegn Tour",
        days: 5,
        status: "Pending",
    },
    {
        leaveType: "Casual",
        fromDate: "05/18/2022",
        toDate: "05/18/2022",
        reason: "Personal",
        days: 5,
        status: "Pending",
    },
    {
        leaveType: "Maternity",
        fromDate: "05/18/2022",
        toDate: "05/18/2022",
        reason: "Maternity",
        days: 5,
        status: "Pending",
    },
];

function InProgress() {
    const [pagination, setpagination] = useState({
        pageNumber: 0,
        pageSize: 10,
        total: 0,
    });
    const [open, setOpen] = useState(false);
    const [searchFields, setsearchFields] = useState({ name: "" });
    const [sortField, setsortField] = React.useState({
        sortField: "id",
        direction: "DESC",
    });
    const handleClickOpen = (value) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const onChangePage = (pageNumber, pageSize) => {};

    const onTableSearch = (values, sortField) => {};

    const columns: Column[] = [
        {
            id: "leaveType",
            label: "LeaveType",
            minWidth: 180,
        },
        {
            id: "fromDate",
            label: "FromDate",
            minWidth: 180,
        },
        {
            id: "toDate",
            label: "ToDate",
            minWidth: 180,
        },
        {
            id: "reason",
            label: "Reason",
            minWidth: 180,
        },
        {
            id: "days",
            label: "Days",
            minWidth: 180,
        },
        {
            id: "status",
            label: "Status",
            minWidth: 180,
        },
        {
            id: "field",
            label: "",
            render: (value: any) => (
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                        handleClickOpen(value);
                    }}
                >
                    cancel
                </Button>
            ),
            minWidth: 180,
        },
    ];

    return (
        <div>
            <Container maxWidth="lg">
                <Card>
                    <CardContent>
                        <PageTitleWrapper>
                            <PageTitle heading="In progress" isButton={false} />
                        </PageTitleWrapper>
                        <Divider />

                        <Tables
                            columns={columns}
                            tableData={mockData}
                            onChangePage={onChangePage}
                            pageNumber={pagination.pageNumber}
                            total={pagination.total}
                            pageSize={pagination.pageSize}
                            searchFields={{}}
                            onTableSearch={onTableSearch}
                        />
                    </CardContent>
                </Card>
                <div>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Open alert dialog
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure Do you want to cancel Request?"}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose}>No</Button>
                            <Button onClick={handleClose} autoFocus>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Container>
        </div>
    );
}

export default InProgress;
