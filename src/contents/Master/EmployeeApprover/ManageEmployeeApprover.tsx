import { Card, CardContent, Container, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import { Column } from "../../../components/atoms/Tables/TableInterface";
import AddEmployeeApprover from "./AddEmployeeApprover";
import { getAllEmployeeApprover } from "./serviceEmployeeApprover";
import CustomizedNotification from 'src/util/CustomizedNotification';
function createData(data) {
  let convertData = data.map((post, index) => {
      return {
          id: post.id,
          name: post.employee.lastName,
          approverOrder: post.approverOrder,
          approverId:post.approver.id,
          employeeId: post.employee.id
      };
  });
  return convertData;
}

function ManageEmployeeApprover() {
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
  const [dataSource, setdataSource] = useState([]);
  const [alert, setalert] = useState({
    type: "",
    mesg: "",
});
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleAlertClose = () => {
    setalert({
        type: '',
        mesg: ''
    });
};
  const handleClose = () => {
    setOpen(false);
  };
  const onChangePage = (pageNumber, pageSize) => {
    if (pagination.pageSize !== pageSize) {
      getAllEmployeeApproverData(0, pageSize);
    } else {
      getAllEmployeeApproverData(pageNumber, pageSize);
    }
  };

  useEffect(() => {
    getAllEmployeeApproverData(pagination.pageNumber, pagination.pageSize);
  }, [pagination.pageNumber, pagination.pageSize]);
  const getAllEmployeeApproverData = (pageNumber, pageSize) => {
    getAllEmployeeApprover(pageNumber, pageSize).then((res: any) => {
        let data: [] = createData(res.results.EmployeeApprovers);
        setpagination({
            pageNumber: res.pagination.pageNumber,
            pageSize: res.pagination.pageSize,
            total: res.pagination.totalRecords,
        });
        setdataSource(data);
    });
  };

  const reloadTable = (res) => {
    console.log({res});
    setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });
    getAllEmployeeApproverData(pagination.pageNumber, pagination.pageSize);
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
      id: "id",
      label: "Id",
      minWidth: 180,
    },
    {
      id: "name",
      label: "name",
      minWidth: 180,
    },
    {
      id: "approverOrder",
      label: "Approver Order",
      minWidth: 180,
    },
    {
      id: "approverId",
      label: "Approver Id",
      minWidth: 180,
    },
    {
      id: "employeeId",
      label: "Employee Id",
      minWidth: 180,
    },
  ];

  return (
    <div>
      <PageTitleWrapper>
        <PageTitle
          heading="Employee"
          name="Add EmployeeApprover"
          subHeading="Master/EmployeeApprover"
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
          modalTitle="Add EmployeeApprover"
          modalWidth="70%"
          open={open}
          onClose={handleClose}
          modalBody={<AddEmployeeApprover reloadTable={reloadTable} handleError={handleError} />}

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
