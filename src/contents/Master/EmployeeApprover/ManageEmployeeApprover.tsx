import { Card, CardContent, Container, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import { Column } from "../../../components/atoms/Tables/TableInterface";
import AddEmployeeApprover from "./AddEmployeeApprover";
import {
  getAllEmployeeApprover,
  getAllEmployee,
  getEmployeeApproverByEmployeeId,
} from "./serviceEmployeeApprover";
import CustomizedNotification from "src/util/CustomizedNotification";
import {
  getPermissionStatus,
  getSubordinatePrivileges,
  sampleFuc,
} from "src/util/permissionUtils";
import AutocompleteSelect from "src/components/atoms/controlls/AutocompleteSelect";

function createData(data) {
  let convertData = data.map((post, index) => {
    return {
      employeeName: post.employee.firstName + " " + post.employee.lastName,
      approverOrder: post.approverOrder,
      approverName: post.approver.employee.lastName + " " +
post.approver.employee.firstName,
    };
  });
  return convertData;
}

function ManageEmployeeApprover() {


  const [open, setOpen] = useState(false);
  const [employeeId, setemployeeId] = useState("");
  const [employeedata, setemployeedata] = useState([]);
  const [updateStatus, setupdateStatus] = useState(true);
  const [employee, setemployee] = useState([]);
  const [searchFields, setsearchFields] = useState({ name: "" });
  const [sortField, setsortField] = React.useState({
    sortField: "id",
    direction: "DESC",
  });
  const [dataSource, setdataSource] = useState([]);
  const [alert, setalert] = useState({
    type: "",
    mesg: "",
  });

  const Approvers = getPermissionStatus("Approvers");
  console.log("Approvers", Approvers);
  const SubApprovers = getSubordinatePrivileges(Approvers, "Approvers");
  console.log("Approvers.status", sampleFuc(SubApprovers));
  console.log("ADD Approvers status", sampleFuc(SubApprovers).CREA);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleAlertClose = () => {
    setalert({
      type: "",
      mesg: "",
    });
  };

 
  

  const handleClose = () => {
    setOpen(false);
  };

  const reloadTable = (res) => {
    console.log({ res });
    setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });

  };

  const handleError = (res) => {
    setalert({
      type: NOTIFICATION_TYPE.error,
      mesg: res.data.validationFailures[0].message,
    });
  };

  const onTableSearch = (values, sortField) => {};
  const columns: Column[] = [
    {
      id: "employeeName",
      label: "Employee Name",
      minWidth: 180,
    },
    {
      id: "approverOrder",
      label: "Level",
      minWidth: 40,
    },
    {
      id: "approverName",
      label: "Approver Name",
      minWidth: 180,
    },
  ];

    // dropdown
    const onValueChange = (e) => {
      setupdateStatus(false);
      const { name, value } = e.target;
      if (name === "employee") {
        setemployeeId(value);
        getEmployeeNameSelectData(value);
      }
    };
      // get by Employee Id
  useEffect(() => {
    getEmployeeNameSelectData(employeeId);
  }, [employeeId]);

  const getEmployeeNameSelectData = (employeeId) => {
    let data: any = [];

    getEmployeeApproverByEmployeeId(employeeId).then(
      (res: []) => {
        data = createData(res);
        setemployeedata(data);
      },
      (error) => {
        setemployeedata([]);
      }
    );
  };
    // get All Employee
    useEffect(() => {
      getAllEmployeeData();
    }, []);
  
    const getAllEmployeeData = () => {
      let data: any = [];
      getAllEmployee().then(
        (res: []) => {
          res.map((post: any) => {
            data.push({ id: post.id, title: post.lastName + " " + post.firstName });
            return null;
          });
          setemployee(data);
        },
        (error) => {
          setemployee([]);
        }
      );
    };

  return (
    <div>
      <PageTitleWrapper>
        {/* sampleFuc(SubEmployeeApprover).CREA && */}
        <PageTitle
          heading="Employee Approvers"
          name="Add Employee Approver"
          subHeading="Master/Approvers"
          isButton={sampleFuc(SubApprovers).CREA ? true : false}
          onclickButton={handleClickOpen}
        />
      </PageTitleWrapper>
      <Divider />
      <br />

      <Container maxWidth="lg">
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={4}>
                <AutocompleteSelect
                  name="employee"
                  label="Employee Name"
                  value={employeeId}
                  onValueChange={onValueChange}
                  options={employee}
                />
              </Grid>
            </Grid>
            
                <Tables
                  columns={columns}
                  tableData={employeedata}
                  showPagination={false}
                  searchFields={{}}
                  onTableSearch={onTableSearch}
                />
            
          </CardContent>
        </Card>
        <Modals
          modalTitle="Add Employee Approver"
          modalWidth="75%"
          open={open}
          onClose={handleClose}
          modalBody={
            <AddEmployeeApprover
              reloadTable={reloadTable}
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

export default ManageEmployeeApprover;
