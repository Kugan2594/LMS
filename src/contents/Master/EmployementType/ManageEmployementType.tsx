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
import { deleteEmployementType, getAllEmployementType } from "./ServiceEmployementType";
import AddEmployementType from "./AddEmployementType";


function createData(data) {
    let convertData = data.map((post, index) => {
        return {
            id: post.id,
            type: post.type,
            createdAt:post.createdAt,
            updatedAt:post.updatedAt
            

        };
    });
    return convertData;
}


function ManageEmployementType() {
    
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
        getAllEmployementTypeData();
    },[]);
    const getAllEmployementTypeData = () => {
        getAllEmployementType().then((res: any) => {
            let data: [] = createData(res);
           
            setdataSource(data);
        });
    };
    
    const deleteOnclick = (row) => {
        deleteEmployementType(row.id).then(
            (res: any) => {
                reloadTable(res);
            },
            (error) => {
                console.log(error);
                handleError(error);
            }
        );
    };

    const reloadTable = (res) => {
        setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });
        console.log("//////////////////////////", res);

        setOpen(false);
        getAllEmployementTypeData();
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
            id: "type",
            label: "Employement Type",
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
                <TableAction rowData={value} deleteOnclick={deleteOnclick} editOnclick={editOnclick} />
            ),
        },
    ];

    return (
        <div>
            <PageTitleWrapper>
                <PageTitle
                    heading="Employement Type"
                    name="Add Employement Type"
                    subHeading="Master/Employement Type"
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
                    modalTitle={action === 'edit' ? 'Edit EmployementType' : 'Add EmployementType'}
                    modalWidth="25%"
                    open={open}
                    // onClose={handleClose}
                    modalBody={<AddEmployementType reloadTable={reloadTable}
                        action={action}
                        editData={editData}
                        handleError={handleError}
                        handleClose={handleClose} />}
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

export default ManageEmployementType;