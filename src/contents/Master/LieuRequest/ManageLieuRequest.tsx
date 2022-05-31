import { Card, CardContent, Container, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { Column } from "../../../components/atoms/Tables/TableInterface";
import { TableAction } from "src/components/atoms/Tables/TableAction";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import CustomizedNotification from "src/util/CustomizedNotification";
import AddLieuRequest from "./AddLieuRequest";
import { getAllLieuRequest } from "./serviceLieuRequest";
import moment from "moment";

function createData(data) {
    let convertData = data.map((post, index) => {
        return {
            id: post.id,
            employeeName: post.employee.lastName,
            requestDate: moment(post.requestDate).format("YYYY-MM-DD"),
            createdAt:moment(post.createdAt).format("YYYY-MM-DD"),
            updatedAt:moment(post.updatedAt).format("YYYY-MM-DD"),
        };
    });
    return convertData;
}

function ManageLieuRequest() {
    const [open, setOpen] = useState(false);
    const [searchFields, setsearchFields] = useState({ name: "" });
    const [sortField, setsortField] = React.useState({
        sortField: "id",
        direction: "DESC",
    });
    const [alert, setalert] = useState({
        type: "",
        mesg: "",
    });
    const [dataSource, setdataSource] = useState([]);
    const [action, setaction] = useState("add");
    const [editData, seteditData] = useState({});

    const handleClickOpen = () => {
        setaction("add");
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getAllLeiuRequestData();
    }, []);
    const getAllLeiuRequestData = () => {
        getAllLieuRequest().then((res: any) => {
            let data: [] = createData(res);
            setdataSource(data);
        });
    };

    const reloadTable = (res) => {
        setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });

        setOpen(false);
        getAllLeiuRequestData();
    };

    const editOnclick = (row) => {
        console.log(row);
        setaction("edit");
        seteditData(row);
        setOpen(true);
    };

    const handleError = (res) => {
        setalert({
            type: NOTIFICATION_TYPE.error,
            mesg: res.data.validationFailures[0].message,
        });
    };
    const handleAlertClose = () => {
        setalert({
            type: "",
            mesg: "",
        });
    };
    const onTableSearch = (values, sortField) => {};
    const columns: Column[] = [
        {
            id: "employeeName",
            label: "Employee Name",
            minWidth: 0,
        },
        {
            id: "requestDate",
            label: "Request Date",
            minWidth: 0,
        },

        {
            id: "createdAt",
            label: "Created At",
            minWidth: 10,
        },
        {
            id: "updatedAt",
            label: "Updated At",
            minWidth: 10,
        },
        {
            id: "action",
            label: "Action",
            width: 90,
            minWidth: 0,
            fixed: "right",
            align: "center",
            render: (value: any) => (
                <TableAction rowData={value} editOnclick={editOnclick} deleteFeature={false} />
            ),
        },
    ];

    return (
        <div>
            <PageTitleWrapper>
                <PageTitle
                    heading="Lieu Request"
                    name="Add Lieu request"
                    subHeading="Master/LieuRequest"
                    isButton={true}
                    onclickButton={handleClickOpen}
                />
            </PageTitleWrapper>
            <Divider />
            <br />

            <Container maxWidth="lg">
                <Card>
                    <CardContent>
                        <Tables
                            columns={columns}
                            tableData={dataSource}
                            searchFields={{}}
                            onTableSearch={onTableSearch}
                        />
                    </CardContent>
                </Card>
                <Modals
                    modalTitle={
                        action === "edit"
                            ? "Edit LieuRequest"
                            : "Add LieuRequest"
                    }
                    modalWidth="25%"
                    open={open}
                    // onClose={handleClose}
                    modalBody={
                        <AddLieuRequest
                            reloadTable={reloadTable}
                            action={action}
                            editData={editData}
                            handleError={handleError}
                            handleClose={handleClose}
                        />
                    }
                />
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

export default ManageLieuRequest;
