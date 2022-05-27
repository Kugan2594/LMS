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
import AddHolidays from "./AddHolidays";
import { getAllHolidays, deleteHolidays } from './ServiceHolidays';
import { NOTIFICATION_TYPE } from "src/util/Notification";
import CustomizedNotification from 'src/util/CustomizedNotification';
function createData(data) {
    let convertData = data.map((post, index) => {
        return {
            id: post.id,
            name: post.name
        };
    });
    return convertData;
}
function ManageHolidays() {
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
    const onTableSearch = (values, sortField) => { };


    useEffect(() => {
        getAllHolidaysData(pagination.pageNumber, pagination.pageSize);
    }, [pagination.pageNumber, pagination.pageSize]);
    const getAllHolidaysData = (pageNumber, pageSize) => {
        getAllHolidays(pageNumber, pageSize).then((res: any) => {
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
        getAllHolidaysData(pagination.pageNumber, pagination.pageSize);
    };
    const columns: Column[] = [
        {
            id: "name",
            label: "Holidays Name",
            minWidth: 0,
        },
        {
            id: "DATE",
            label: "DATE",
            minWidth: 0,
        },
        {
            id: "createddate",
            label: "CREATED DATE",
            minWidth: 0,
        },
        {
            id: "updateddate",
            label: "UPDATED DATE",
            minWidth: 0,
        },
        {
            id: "action",
            label: "Action",
            fixed: "right",
            minWidth: 0,
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
    const [action, setaction] = useState('add');
    const handleClickOpen = (value) => {
        setaction('add');
        setOpen(true);
    };

    const [Holidays, setHolidays] = useState("");
    const [error, setError] = useState(false);
    const [update, setUpdate] = useState(false);
    const onChangeHandler = (businessUnitValue) => {
        setHolidays(businessUnitValue);
        console.log(Holidays);
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
        deleteHolidays(row.id).then(
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
        if (Holidays === "") {
            setError(true);
        } else {
            setUpdate(false);
            setHolidays("");
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
                <PageTitle
                    heading="Manage Holidays"
                    subHeading="Master/ Holidays"
                    isButton={true}
                    name="Add Holidays"
                    onclickButton={handleClickOpen}
                />
            </PageTitleWrapper>
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
                    modalTitle={action === 'edit' ? 'Edit Holidays' : 'Add Holidays'}
                    modalWidth="50%"
                    open={open}
                    onClose={handleClose}
                    modalBody={<AddHolidays reloadTable={reloadTable}
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

export default ManageHolidays;
