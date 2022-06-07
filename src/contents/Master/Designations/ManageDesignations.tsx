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
import React, { useState, useEffect } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { TableAction } from "src/components/atoms/Tables/TableAction";
import { Column } from "src/components/atoms/Tables/TableInterface";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import ViewHistory from "../History/ViewHistory";
import LeaveRequestForm from "../LeaveRequest/LeaveRequestForm";
import AddDesignation from "./AddDesignation";
import { getAllDesignation, deleteDesignation } from './ServiceDesignation';
import { NOTIFICATION_TYPE } from "src/util/Notification";
import CustomizedNotification from 'src/util/CustomizedNotification';
import moment from "moment";
import { getPermissionStatus, getSubordinatePrivileges, sampleFuc } from "src/util/permissionUtils";
function createData(data) {
    let convertData = data.map((post, index) => {
        return {
            id: post.id,
            name: post.name,
            createdAt:moment(post.createdAt).format("YYYY-MM-DD"),
            updatedAt:moment(post.updatedAt).format("YYYY-MM-DD")
        };
    });
    return convertData;
}
function ManageDesignations() {
    const [pagination, setpagination] = useState({
        pageNumber: 0,
        pageSize: 10,
        total: 0,
    });
    const [open, setOpen] = useState(false);
    const [editData, seteditData] = useState({});
    const [searchFields, setsearchFields] = useState({ name: "" });
    const [sortField, setsortField] = React.useState({
        sortField: "id",
        direction: "DESC",
    });
    const [dataSource, setdataSource] = useState([]);
    const onChangePage = (pageNumber, pageSize) => { };
    const [alert, setalert] = useState({
        type: "",
        mesg: "",
    });

    const Settings = getPermissionStatus("Settings");
    console.log("Settings", Settings);
    const SubDesignations = getSubordinatePrivileges(Settings, "Designations");
    console.log(" Settings .status", sampleFuc(SubDesignations));
    console.log("ADD Settings status", sampleFuc(SubDesignations).CRHL);

    const onTableSearch = (values, sortField) => { };


    useEffect(() => {
        getAllDesignationData(pagination.pageNumber, pagination.pageSize);
    }, [pagination.pageNumber, pagination.pageSize]);
    const getAllDesignationData = (pageNumber, pageSize) => {
        getAllDesignation(pageNumber, pageSize).then((res: any) => {
            let data: [] = createData(res.results.Designation);
            setpagination({
                pageNumber: res.pagination.pageNumber,
                pageSize: res.pagination.pageSize,
                total: res.pagination.totalRecords,
            });
            setdataSource(data);
        });
    };

    const reloadTable = (res) => {
        console.log("ppppppppppppppppp", res);
        setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });
        setOpen(false);
        getAllDesignationData(pagination.pageNumber, pagination.pageSize);
    };
    const columns: Column[] = [
        {
            id: "name",
            label: "Designation Name",
            minWidth: 0,
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
            fixed: "right",
            width: 90,
            minWidth: 0,
            align: "center",
            render: (value: any) => 
                sampleFuc(SubDesignations).UPDN &&
                sampleFuc(SubDesignations).DEDN &&
                <TableAction
                    rowData={value}
                    deleteOnclick={deleteOnclick}
                    editOnclick={editOnclick}
                />
        },
    ];
    const [action, setaction] = useState('add');
    const handleClickOpen = (value) => {
        setaction('add');
        setOpen(true);
    };

    const [designation, setDesignation] = useState("");
    const [error, setError] = useState(false);
    const [update, setUpdate] = useState(false);
    const onChangeHandler = (designationValue) => {
        setDesignation(designationValue);
        console.log(designation);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAlertClose = () => {
        setalert({
            type: '',
            mesg: ''
        });
    };
    const editOnclick = (row) => {
        console.log(row);
        setaction('edit');
        seteditData(row);
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const deleteOnclick = (row) => {
        deleteDesignation(row.id).then(
            (res: any) => {
                reloadTable(res);
            },
            (error) => {
                console.log(error);
                handleError(error);
            }
        );
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
    const handleError = (res) => {
        setalert({
            type: NOTIFICATION_TYPE.error,
            mesg: res.data.validationFailures[0].message,
        });
    };
    return (
        <div>
            <PageTitleWrapper>
            {/* sampleFuc(SubDesignation).CRDN && */}
                <PageTitle
                    heading="Designation"
                    subHeading="Master/Designation"
                    isButton={true}
                    name="Add Designation"
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
                            onChangePage={onChangePage}
                            pageNumber={pagination.pageNumber}
                            total={pagination.total}
                            pageSize={pagination.pageSize}
                            searchFields={{}}
                            onTableSearch={onTableSearch}
                        />
                    </CardContent>
                </Card>
                <Modals
                    modalTitle={action === 'edit' ? 'Edit Designation' : 'Add Designation'}
                    modalWidth="25%"
                    open={open}
                    // onClose={handleClose}
                    modalBody={<AddDesignation reloadTable={reloadTable}
                        action={action}
                        editData={editData}
                        handleError={handleError}
                        handleClose={handleClose}
                        />}
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

export default ManageDesignations;
