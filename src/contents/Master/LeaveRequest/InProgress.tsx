import { Button, Card, CardContent, Container, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { Column } from "../../../components/atoms/Tables/TableInterface";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LeaveRequestForm from "./LeaveRequestForm";
import ViewHistory from "../History/ViewHistory";
import { getAllLeaveRequest, cancelLeaveRequest } from "./ServiceLeaveRequest";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import { TableAction } from "src/components/atoms/Tables/TableAction";
import CustomizedNotification from "src/util/CustomizedNotification";

function createData(data) {
  let convertData = data.map((post, index) => {
    return {
      reason: post.reason,
      fromDate: post.fromDate,
      toDate: post.toDate,
      leaveDays: post.leaveDays,
      requestedDate: post.requestedDate,
      leaveType: post.employeeLeaveType.leaveType.type,
      firstName: post.employee.firstName,
      lastName: post.employee.lastName,
    };
  });
  return convertData;
}

function InProgress() {
  const [pagination, setpagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    total: 0,
  });

  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [searchFields, setsearchFields] = useState({ name: "" });
  const [sortField, setsortField] = React.useState({
    sortField: "id",
    direction: "DESC",
  });
  const [update, setUpdate] = useState(false);
  const handleUpdate = (value) => {
    setUpdate(true);
  };
  const handleUpdateClose = (value) => {
    setUpdate(false);
  };

  const [leaveDetails, setLeaveDetails] = useState({});

  const handleOpenLeaveDetails = (value) => {
    setOpenDetails(true);
    setLeaveDetails(value);
  };

  const handleClickOpen = (value) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDetails(false);
  };

  //   get all leave request with pagination
  const [dataSource, setdataSource] = useState([]);
  const [alert, setalert] = useState({
    type: "",
    mesg: "",
  });

  const onChangePage = (pageNumber, pageSize) => {
    if (pagination.pageSize !== pageSize) {
      getAllLeaveRequestData(0, pageSize);
    } else {
      getAllLeaveRequestData(pageNumber, pageSize);
    }
  };

  useEffect(() => {
    getAllLeaveRequestData(pagination.pageNumber, pagination.pageSize);
  }, [pagination.pageNumber, pagination.pageSize]);
  const getAllLeaveRequestData = (pageNumber, pageSize) => {
    getAllLeaveRequest(pageNumber, pageSize).then((res: any) => {
      let data: [] = createData(res.results.LeaveRequest);
      setpagination({
        pageNumber: res.pagination.pageNumber,
        pageSize: res.pagination.pageSize,
        total: res.pagination.totalRecords,
      });
      setdataSource(data);
    });
  };

  const reloadTable = (res) => {
    setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });
    console.log("//////////////////////////", res);

    setOpen(false);
    getAllLeaveRequestData(pagination.pageNumber, pagination.pageSize);
  };

  const handleError = (res) => {
    setalert({
      type: NOTIFICATION_TYPE.error,
      mesg: res.data.validationFailures[0].message,
    });
  };

  const deleteOnclick = (row) => {
    cancelLeaveRequest(row.id).then(
      (res: any) => {
        reloadTable(res);
      },
      (error) => {
        console.log(error);
        handleError(error);
      }
    );
  };

  const editOnclick = (row) => {
    console.log(row);
    // setaction("edit");
    // seteditData(row);
    // setOpen(true);
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
      id: "firstName",
      label: "FirstName",
      minWidth: 0,
    },
    {
      id: "lastName",
      label: "LastName",
      minWidth: 0,
    },
    {
      id: "leaveType",
      label: "LeaveType",
      minWidth: 0,
    },
    {
      id: "fromDate",
      label: "FromDate",
      minWidth: 0,
    },
    {
      id: "toDate",
      label: "ToDate",
      minWidth: 0,
    },
    {
      id: "reason",
      label: "Reason",
      minWidth: 0,
    },
    {
      id: "leaveDays",
      label: "Days",
      minWidth: 0,
    },
    {
      id: "details",
      label: "",
      minWidth: 40,
      render: (value) => (
        <Button
          variant="text"
          size="small"
          onClick={() => handleOpenLeaveDetails(value)}
        >
          Detail
        </Button>
      ),
    },
    {
      id: "action",
      label: "Action",
      minWidth: 100,
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

  return (
    <div>
      <PageTitleWrapper>
        <PageTitle
          heading="Manage Leave Request"
          subHeading="Master/ManageLeaveRequest"
          isButton={false}
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
        <div>
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
        <div>
          <Dialog
            open={openDetails}
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
        </div>
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

export default InProgress;
