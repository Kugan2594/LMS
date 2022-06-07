import { Card, CardContent, Container, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { Column } from "../../../components/atoms/Tables/TableInterface";
import AddEmployee from "./AddEmployee";
import { TableAction } from "src/components/atoms/Tables/TableAction";
import { deleteEmployee, getAllEmployee, UploadService } from "./ServiceEmployee";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import CustomizedNotification from "src/util/CustomizedNotification";
import FileSaver from "file-saver";
import axios from "axios";
import { Upload, Button } from "antd";
import Button1 from "src/components/atoms/controlls/Button";


import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import Input from "src/components/atoms/controlls/Input";
function createData(data) {
  let convertData = data.map((post, index) => {
    return {
      id: post.id,
      empId: post.empId,
      email: post.email,
      firstName: post.firstName,
      lastName: post.lastName,
      address: post.address,
      name: post.designation.name,
      joinDate: post.joinDate,
      dateOfPermanency: post.dateOfPermanency,
      location: post.companyLocation.location,
      description: post.description,
      employmentTypeId: post.employementType.id,
      businessUnitId: post.businessUnit.id,
      dateOfBirth: post.dateOfBirth,
      contactNo: post.contactNo,
      religon: post.religon,
      gender: post.gender,
      nic: post.nic,
      maritalStatus: post.maritalStatus,
      approverStatus: post.approverStatus,
      nationality: post.nationality,
      bloodGroup: post.bloodGroup,
      drivingLicenceNo: post.drivingLicenceNo,
      passportNo: post.passportNo,
      designationId: post.designation.id,
      companyLocationId: post.companyLocation.id,
      roleId: post.role.id,
      roleName: post.role.name,
    };
  });
  return convertData;
}

function ManageEmployee() {
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
  const onChangePage = (pageNumber, pageSize) => {
    if (pagination.pageSize !== pageSize) {
      getAllEmployeeData(0, pageSize);
    } else {
      getAllEmployeeData(pageNumber, pageSize);
    }
  };

  useEffect(() => {
    getAllEmployeeData(pagination.pageNumber, pagination.pageSize);
  }, [pagination.pageNumber, pagination.pageSize]);
  const getAllEmployeeData = (pageNumber, pageSize) => {
    getAllEmployee(pageNumber, pageSize).then((res: any) => {
      let data: [] = createData(res.results.Employee);
      setpagination({
        pageNumber: res.pagination.pageNumber,
        pageSize: res.pagination.pageSize,
        total: res.pagination.totalRecords,
      });
      setdataSource(data);
    });
  };
  const deleteOnclick = (row) => {
    deleteEmployee(row.id).then(
      (res: any) => {
        reloadTable(res);
      },
      (error) => {
        console.log(error);
        handleError(error);
      }
    );
  };


  const handleUPload = (e) => { 

    UploadService().then(
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
    getAllEmployeeData(pagination.pageNumber, pagination.pageSize);
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
  const onChange = (page) => {
    console.log(page);
    setpagination({
      pageNumber: page.pageNumber - 1,
      pageSize: page.pageSize,
      total: pagination.total,
    });
    setTimeout(() => {
      getAllEmployeeData(page.current - 1, page.pageSize);
    }, 200);
  };

  const importEmp = () => {
    console.log("exp");
    axios({
      url: "http://localhost:1309/leave-management/api/v1/csvDownload",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      method: "GET",
      responseType: "arraybuffer",
    }).then((response) => {
      var blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      FileSaver.saveAs(blob, "employees.csv");
    });
  };
  const uploadProps = {
    name: "file",
    action: "http://localhost:1309/leave-management/api/v1/csvUpload",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },

    onChange(info) {
      console.log({ info });
      if (info.file.status !== "uploading") {
      }

      if (info.file.status === "done") {
        console.log(info.file);
        const { pageSize, pageNumber } = pagination;

        getAllEmployeeData(pageNumber, pageSize);
      }
    },
  };
  const onTableSearch = (values, sortField) => {};
  const columns: Column[] = [
    {
      id: "empId",
      label: "Employee Id",
      minWidth: 120,
    },
    {
      id: "firstName",
      label: "FirstName",
      minWidth: 120,
    },
    {
      id: "roleName",
      label: "Role",
      minWidth: 120,
    },
    {
      id: "email",
      label: "Email",
      minWidth: 120,
    },

    {
      id: "address",
      label: "Address",
      minWidth: 120,
    },
    {
      id: "name",
      label: "Designation",
      minWidth: 120,
    },
    {
      id: "nic",
      label: "NIC No",
      minWidth: 120,
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
          heading="Employee"
          name="Add Employee"
          subHeading="Master/Employee"
          isButton={true}
          importCSV={true}
          exportCSV={true}
          onChangeImport={importEmp}
          onChangeExport={handleUPload}
          onclickButton={handleClickOpen}
        />
      </PageTitleWrapper>
      <Divider />
      <div style={{ display: "flex" }}>
        
        <Upload {...uploadProps}>
          <Button icon={<DownloadOutlined />} />
        </Upload>
      </div>
      <br />
      <Divider />

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
          modalTitle={action === "edit" ? "Edit Employee" : "Add Employee"}
          modalWidth="60%"
          open={open}
          // onClose={handleClose}
          modalBody={
            <AddEmployee
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

export default ManageEmployee;
