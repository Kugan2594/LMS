import { Card, CardContent, Container, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { Column } from "../../../components/atoms/Tables/TableInterface";
import { TableAction } from "src/components/atoms/Tables/TableAction";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import CustomizedNotification from 'src/util/CustomizedNotification';
import AddLieuRequest from "./AddLieuRequest";
import { getAllLieuRequest } from "./serviceLieuRequest";


function createData(data) {
    let convertData = data.map((post, index) => {
        return {
            id: post.id,
            employeeId: post.employee.id,
            requestDate:post.requestDate,
            createdAt:post.createdAt,
            updatedAt:post.updatedAt   

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
    const [action, setaction] = useState('add');
    const [editData, seteditData] = useState({});

    const handleClickOpen = () => {
        setaction('add');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getAllLeiuRequestData();
    },[]);
    const getAllLeiuRequestData = () => {
        getAllLieuRequest().then((res: any) => {
            let data: [] = createData(res);
           
            setdataSource(data);
        });
    };
    
    // const deleteOnclick = (row) => {
    //     deleteLieuRequest(row.id).then(
    //         (res: any) => {
    //             reloadTable(res);
    //         },
    //         (error) => {
    //             console.log(error);
    //             handleError(error);
    //         }
    //     );
    // };

    const reloadTable = (res) => {
        setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });
        console.log("//////////////////////////", res);

        setOpen(false);
        getAllLieuRequest();
    };

    const editOnclick = (row) => {
        console.log(row);
        setaction('edit');
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
            type: '',
            mesg: ''
        });
    };
    const onTableSearch = (values, sortField) => { };
    const columns: Column[] = [
        {
            id: "id",
            label: "Id",
            minWidth: 120,
        },
        {
            id: "employeeId",
            label: "Employee id",
            minWidth: 120,
        },
        {
            id: "requestDate",
            label: "Request Date",
            minWidth: 120,
        },
        {
            id: "createdAt",
            label: "Create Date",
            minWidth: 120,
        },
        {
            id: "updatedAt",
            label: "Update Date",
            minWidth: 120,
        },

        
        {
            id: "action",
            label: "Action",
            minWidth: 100,
            fixed: "right",
            align: "center",
            render: (value: any) => (
                <TableAction rowData={value} editOnclick={editOnclick} />
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
                    modalTitle={action === 'edit' ? 'Edit LieuRequest' : 'Add LieuRequest'}
                    modalWidth="20%"
                    open={open}
                    onClose={handleClose}
                    modalBody={<AddLieuRequest reloadTable={reloadTable}
                        action={action}
                        editData={editData}
                        handleError={handleError} />}
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