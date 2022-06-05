import { Card, CardContent, Container } from "@mui/material";
import moment from "moment";
import React, { useState, useEffect } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { TableAction } from "src/components/atoms/Tables/TableAction";
import { Column } from "src/components/atoms/Tables/TableInterface";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import CustomizedNotification from "src/util/CustomizedNotification";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import AddRoles from "./AddRoles";
import { deleteRole, getAllRole } from "./ServiceRoles";

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

function ManageRoles() {
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
  const [action, setaction] = useState("add");
  const handleClickOpen = (value) => {
    setaction("add");
    setOpen(true);
  };
  const [role, setRole] = useState("");
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(false);
  const onChangeHandler = (roleValue) => {
    setRole(roleValue);
    console.log(role);
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
  const deleteOnclick = (row) => {
    deleteRole(row.id).then(
      (res: any) => {
        reloadTable(res);
      },
      (error) => {
        console.log(error);
        handleError(error);
      }
    );
  };
  const handleError = (res) => {
    setalert({
      type: NOTIFICATION_TYPE.error,
      mesg: res.data.validationFailures[0].message,
    });
  };

  useEffect(() => {
    getAllRoleData(pagination.pageNumber, pagination.pageSize);
  }, [pagination.pageNumber, pagination.pageSize]);
  const getAllRoleData = (pageNumber, pageSize) => {
    getAllRole(pageNumber, pageSize).then((res: any) => {
      let data: [] = createData(res.results.Role_Pagination);
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
    getAllRoleData(pagination.pageNumber, pagination.pageSize);
  };

  const columns: Column[] = [
    {
      id: "name",
      label: "Role Name",
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
          heading="Role"
          subHeading="Master/Role"
          isButton={true}
          name="Add Role"
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
          modalTitle={
            action === "edit" ? "Edit Role" : "Add Role"
          }
          modalWidth="25%"
          open={open}
          // onClose={handleClose}
          modalBody={
            <AddRoles
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

export default ManageRoles;
