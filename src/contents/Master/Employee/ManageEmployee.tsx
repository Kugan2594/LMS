import { Card, CardContent, Container, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { Column } from "../../../components/atoms/Tables/TableInterface";
import AddEmployee from "./AddEmployee";
import CsvUpload from "./CsvUpload";
import { TableAction } from "src/components/atoms/Tables/TableAction";
import { deleteEmployee, getAllEmployee, UploadService } from "./ServiceEmployee";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import CustomizedNotification from "src/util/CustomizedNotification";
import { getPermissionStatus, getSubordinatePrivileges, sampleFuc } from "src/util/permissionUtils";
import FileSaver from "file-saver";
import axios from "axios";

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
  const [responseStatus, setresponseStatus] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [file, setFile] = useState<any>();
  const [mockData, setmockData] = useState<any>('');
  const [open, setOpen] = useState(false);
  const [searchFields, setsearchFields] = useState({ name: "" });
  const [csvErr, setcsvErr] = useState('');

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

  const Employees = getPermissionStatus("Employees");
  console.log("Employees", Employees);
  const SubEmployee = getSubordinatePrivileges(Employees, "Employees");
  console.log("Employees.status", sampleFuc(SubEmployee));
  console.log("ADD Employee status", sampleFuc(SubEmployee).CREM);

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


  };

  const reloadTable = (res) => {
    getAllEmployeeData(pagination.pageNumber, pagination.pageSize);
    setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });
    console.log("//////////////////////////", res);

    setOpen(false);
 
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

  const exportEmp = () => {
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

  const onTableSearch = (values, sortField) => { };
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
      render: (value: any) =>
        sampleFuc(SubEmployee).UPEM && sampleFuc(SubEmployee).DEEM &&
        <TableAction
          rowData={value}
          deleteOnclick={deleteOnclick}
          editOnclick={editOnclick}
        />
    },
  ];
  const onSaveFile = () => {
    if (file && csvErr === '') {
      const formData = new FormData();
      file && formData.append('file', file);


      UploadService(formData).then(
        (res: any) => {
          reloadTable(res);
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",res);
          setFile(null);
          let errorData =
            res.data && res.data.result && res.data.result.errorPassengerCsv;
          if (res.data.status === 'warning') {
            setalert({
              type: NOTIFICATION_TYPE.warning,
              mesg: res.data.message
            });
          } else {
            reloadTable(res);
            handleClose();
          }
          if (errorData.length > 0) {
            const csvString = [
              [
                'empId',
                'first name',
                'last name',
                'email',
                'contact no',
                'gender',
                'designation name',
                'nic',
                'address',
                'company location',
                'employment Type',
                'business Unit',
                'role',
                'Error'
              ],
              ...errorData.map((item) => [
                item.empId,
                item.firstName,
                item.lastName,
                item.email,
                item.contactNo,
                item.gender,
                item.designationName,
                item.nic,
                item.address,
                item.CompanyLocation,
                item.employmentType,
                item.businessUnit,
                item.errors

              ])
            ]
              .map((e) => e.join(','))
              .join('\n');

            console.log('csvString', csvString);

            res.data.result && setresponseStatus(true);
            setTimeout(() => {
              setmockData(csvString);
            }, 200);
            setOpenImport(false);

          } else {
            setOpenImport(false);
          }

          //  setOpenImport(false);
        },
        (error) => {
          console.log(error);
          handleError(error);
        }
      );

    }
  };
  const handleCloseImport = (value) => {
    setOpenImport(false);
    setFile(null);

  };
  const onChangeImport = (e) => {
    setOpenImport(true);
    setresponseStatus(false);
    setmockData('');
  };
  return (
    <div>
      <PageTitleWrapper>
        <PageTitle
          heading="Employee"
          name="Add Employee"
          subHeading="Master/Employee"
          isButton={sampleFuc(SubEmployee).CREM ? true : false}
          importCSV={sampleFuc(SubEmployee).IEWC ? true : false}
          exportCSV={sampleFuc(SubEmployee).EETC ? true : false}
          onChangeExport={exportEmp}
          onChangeImport={onChangeImport}
          onclickButton={handleClickOpen}
        />
      </PageTitleWrapper>
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
        <Modals
          modalTitle="Bulk Import"
          modalWidth="85%"
          modalHeigth="95%"
          open={openImport}
          onClose={handleCloseImport}
          modalBody={
            openImport && (
              <CsvUpload
                setFile={setFile}
                onSaveFile={onSaveFile}
                setErr={setcsvErr}
                mockData={mockData}
                responseStatus={responseStatus}
                setOpenImport={setOpenImport}
              />
            )
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
