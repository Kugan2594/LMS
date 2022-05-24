import {
    Button,
    Card,
    CardContent,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Input,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { TableAction } from "src/components/atoms/Tables/TableAction";
import { Column } from "src/components/atoms/Tables/TableInterface";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import ViewHistory from "../History/ViewHistory";
import LeaveRequestForm from "../LeaveRequest/LeaveRequestForm";
import AddDesignation from "./AddDesignation";

let mockData = [
    {
        designationName: "Senior Software Engineer",
        createdDate: "23-05-2022",
        updatedDate: "23-05-2022",
    },
    {
        designationName: "Software Engineer",
        createdDate: "23-05-2022",
        updatedDate: "23-05-2022",
    },
    {
        designationName: "Associate Software Engineer",
        createdDate: "23-05-2022",
        updatedDate: "23-05-2022",
    },
];

function ManageDesignations() {
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

    const onChangePage = (pageNumber, pageSize) => {};

    const onTableSearch = (values, sortField) => {};
    const deleteOnclick = () => {};

    const columns: Column[] = [
        {
            id: "designationName",
            label: "Designation Name",
            minWidth: 0,
        },
        {
            id: "createdDate",
            label: "Creataed Date",
            minWidth: 0,
        },
        {
            id: "updatedDate",
            label: "Updated Date",
            minWidth: 0,
        },
        {
            id: "action",
            label: "Action",
            minWidth: 0,
            fixed: "right",
            align: "center",
            render: (value: any) => (
                <TableAction
                    rowData={value}
                    deleteOnclick={deleteOnclick}
                    editOnclick={editOnclick}
                />
            ),
        },
    ];
    const handleClickOpen = (value) => {
        setOpen(true);
    };

    const [designation, setDesignation] = useState("");
    const [error, setError] = useState(false);
    const [update, setUpdate] = useState(false);
    const onChangeHandler = (designationValue) => {
        setDesignation(designationValue);
        console.log(designation);
    };

    const handleClose = (e) => {
        setError(false);
        if (designation === "") {
            setError(true);
        } else {
            setOpen(false);
            setDesignation("");
        }
    };
    const editOnclick = () => {
        setUpdate(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const handleClose1 = (e) => {
        setError(false);
        if (designation === "") {
            setError(true);
        } else {
            setUpdate(false);
            setDesignation("");
        }
    };
    const handleCancel1 = () => {
        setUpdate(false);
    };

    return (
        <div>
            <Container maxWidth="lg">
                <Card>
                    <CardContent>
                        <PageTitleWrapper>
                            <PageTitle
                                heading="Manage Designations"
                                name="Add Designation"
                                isButton={true}
                                onclickButton={handleClickOpen}
                            />
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
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Add Designation
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description"></DialogContentText>
                            <AddDesignation
                                designationValue={designation}
                                designationChange={onChangeHandler}
                                error={error}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button type="submit" onClick={handleClose}>
                                Add
                            </Button>
                            <Button onClick={handleCancel} autoFocus>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div>
                    <Dialog
                        open={update}
                        onClose={handleClose1}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Update Designation
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description"></DialogContentText>
                            <AddDesignation
                                designationValue={designation}
                                designationChange={onChangeHandler}
                                error={error}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button type="submit" onClick={handleClose1}>
                                Add
                            </Button>
                            <Button onClick={handleCancel1} autoFocus>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Container>
        </div>
    );
}

export default ManageDesignations;
