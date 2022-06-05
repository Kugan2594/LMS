import {
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Typography,
} from "@mui/material";
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
import {
  getAllLeaveRequest,
  cancelLeaveRequest,
  updateLeaveRequest,
} from "./ServiceLeaveRequest";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import { TableAction } from "src/components/atoms/Tables/TableAction";
import CustomizedNotification from "src/util/CustomizedNotification";
import UpdateLeaveRequest from "./UpdateLeaveRequest";
import moment from "moment";
import { getLeaveApproverStatusHistory } from "../History/serviceHistory";

// function createData(data) {
//   let convertData = data.map((post, index) => {
//     return {
//       leaveRequestId: post.id,
//       reason: post.reason,
//       fromDate: moment(post.fromDate).format("DD-MM-yyyy"),
//       toDate: moment(post.toDate).format("DD-MM-yyyy"),
//       leaveDays: post.leaveDays,
//       requestedDate: moment(post.requestedDate).format("DD-MM-yyyy"),
//       leaveType: post.employeeLeaveType.leaveType.type,
//       firstName: post.employee.firstName,
//       lastName: post.employee.lastName,
//       leaveTypeId: post.employeeLeaveType.leaveType.id,
//       employeeId: post.employee.id,
//     };
//   });
//   return convertData;
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

function InProgress(props) {
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
  const [alert, setalert] = useState({
    type: "",
    mesg: "",
  });
  const [dataSource, setdataSource] = useState([]);
  const [action, setaction] = useState("add");
  const [editData, seteditData] = useState({});
  const handleClickOpen = () => {
    setaction('add');
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenDetails(false);
  };
  const [update, setUpdate] = useState(false);
  const handleUpdate = (value) => {
    setUpdate(true);
  };
  const handleUpdateClose = (value) => {
    setUpdate(false);
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
  const [leaveDetails, setLeaveDetails] = useState({});
  const handleOpenLeaveDetails = (value) => {
    setOpenDetails(true);
    setLeaveDetails(value);
  };
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
    getLeaveApproverStatusHistory(pageNumber, pageSize).then((res: any) => {
      // let data: [] = createData(res.results.leaveHistory);
      setpagination({
        pageNumber: res.pagination.pageNumber,
        pageSize: res.pagination.pageSize,
        total: res.pagination.totalRecords,
      });
      let value: {id:Number,status:String,approverName:String,date:String,reason:String,fromDate:String,toDate:String,leaveDays:Number,
        requestedDate:String,leaveType:String,lastName:String,firstName:String,leaveRequestId:Number}[] = createData(res.results.leaveHistory);
      setdataSource(value.filter((request) => request.status == "PENDING" || request.status == "NEW").map((filtered) => filtered));
      // setdataSource(data);
    });
  };
  const reloadTable = (res) => {
    setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });
    console.log("//////////////////////////", res);
    setOpen(false);
    getAllLeaveRequestData(pagination.pageNumber, pagination.pageSize);
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
  const onTableSearch = (values, sortField) => {};
  const columns: Column[] = [
    {
      id: "leaveType",
      label: "Leave Type",
      minWidth: 0,
    },
    {
      id: "fromDate",
      label: "From Date",
      minWidth: 0,
    },
    {
      id: "toDate",
      label: "To Date",
      minWidth: 0,
    },
    {
      id: "leaveDays",
      label: "Leave Days",
      minWidth: 0,
    },
    {
      id: "reason",
      label: "Reason",
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
      render: (value: any) => (
         value.status == "APPROVED" ? <Chip label="APPROVED" color="success" size="small" /> : value.status == "REJECTED" ? <Chip label="REJECTED" color="error" size="small" /> : <Chip label="PENDING" color="warning" size="small" />
      )
    },
    {
      id: "details",
      label: "",
      minWidth: 0,
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
  return (
    <div>
      {props.isTitle && (
        <div>
          <PageTitleWrapper>
            <PageTitle
              heading="InProgress Leave Requests"
              name="Approval Status"
              subHeading="Master"
              isButton={true}
              onclickButton={handleClickOpen}
            />
          </PageTitleWrapper>
          <Divider />
        </div>
      )}
      <br />
      <Container maxWidth="lg">
        <Card>
          <Typography variant="h6" margin="10px 0 0 20px" color="#1a8cff">
            In Progress Leaves
          </Typography>
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
        open={openDetails}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          {""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <ViewHistory details={leaveDetails} isEmployeeDetail={false} isResponseButtons={false} cancel={handleClose} />
          </DialogContentText>
        </DialogContent>
      </Dialog>

        <Modals
          modalTitle="edit"
          modalWidth="60%"
          open={open}
          onClose={handleClose}
          modalBody={
            <UpdateLeaveRequest
              reloadTable={reloadTable}
              action={action}
              editData={editData}
              handleError={handleError}
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
export default InProgress;
