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
import AddBusinessUnit from "./AddBusinessUnit";
import { getAllBusinessUnit, deleteBusinessUnit } from "./ServiceBusinessUnit";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import CustomizedNotification from "src/util/CustomizedNotification";
import moment from "moment";
import {
  getPermissionStatus,
  getSubordinatePrivileges,
  sampleFuc,
} from "src/util/permissionUtils";
function createData(data) {
  let convertData = data.map((post, index) => {
    return {
      id: post.id,
      name: post.name,
      createdAt: moment(post.createdAt).format("YYYY-MM-DD"),
      updatedAt: moment(post.updatedAt).format("YYYY-MM-DD"),
    };
  });
  return convertData;
}
function ManageBusinessUnit() {
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
  const onChangePage = (pageNumber, pageSize) => {};
  const [alert, setalert] = useState({
    type: "",
    mesg: "",
  });
  const onTableSearch = (values, sortField) => {};

  const Settings = getPermissionStatus("Settings");
  console.log("Settings", Settings);
  const SubBussinessUnit = getSubordinatePrivileges(Settings, "Unit");
  console.log("Settings .status", sampleFuc(SubBussinessUnit));
  console.log("ADD Settings status", sampleFuc(SubBussinessUnit).CRBU);

  useEffect(() => {
    getAllBusinessUnitData(pagination.pageNumber, pagination.pageSize);
  }, [pagination.pageNumber, pagination.pageSize]);
  const getAllBusinessUnitData = (pageNumber, pageSize) => {
    getAllBusinessUnit(pageNumber, pageSize).then((res: any) => {
      let data: [] = createData(res.results.Business_Unit);
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
    getAllBusinessUnitData(pagination.pageNumber, pagination.pageSize);
  };
  const columns: Column[] = [
    {
      id: "name",
      label: "BusinessUnit Name",
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
        // sampleFuc(SubBussinessUnit).UPBU &&
        // sampleFuc(SubBussinessUnit).DEBU && (
          <TableAction
            rowData={value}
            deleteOnclick={deleteOnclick}
            editOnclick={editOnclick}
          />
        // ),
    },
  ];
  const [action, setaction] = useState("add");
  const handleClickOpen = (value) => {
    setaction("add");
    setOpen(true);
  };

  const [BusinessUnit, setBusinessUnit] = useState("");
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(false);
  const onChangeHandler = (businessUnitValue) => {
    setBusinessUnit(businessUnitValue);
    console.log(BusinessUnit);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAlertClose = () => {
    setalert({
      type: "",
      mesg: "",
    });
  };
  const editOnclick = (row) => {
    console.log(row);
    setaction("edit");
    seteditData(row);
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const deleteOnclick = (row) => {
    deleteBusinessUnit(row.id).then(
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
    if (BusinessUnit === "") {
      setError(true);
    } else {
      setUpdate(false);
      setBusinessUnit("");
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
          heading="Business Unit"
          subHeading="Master/Business Unit"
          isButton={sampleFuc(SubBussinessUnit).CRBU ? true : false}
          name="Add Business Unit"
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
          modalTitle={
            action === "edit" ? "Edit BusinessUnit" : "Add BusinessUnit"
          }
          modalWidth="25%"
          open={open}
          // onClose={handleClose}
          modalBody={
            <AddBusinessUnit
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

export default ManageBusinessUnit;
