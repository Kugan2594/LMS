import { Card, CardContent, Container, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import { Column } from "../../../components/atoms/Tables/TableInterface";
import { getAllEmployee } from "../Employee/ServiceEmployee";
import { getAllLeaveType } from "./serviceLeaveType";

function createData(data) {
  let convertData = data.map((post, index) => {
      return {
          id: post.id,
          type: post.type,
          noticePeriod: post.noticePeriod,
          description: post.description
      };
  });
  return convertData;
}

let mockData = [
  {
    id: 1,
    type: "Casual",
    noticePeriod: 2,
    description:"this is casual leave"
  },
  {
    id: 2,
    type: "Anual",
    noticePeriod: 4,
    description:"this is anual leave"
  },
];

function ManageLeaveType() {
  const [pagination, setpagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    total: 0,
  });

  const [dataSource, setdataSource] = useState([]);

  const [alert, setalert] = useState({
    type: "",
    mesg: "",
});

  const onChangePage = (pageNumber, pageSize) => {
    if (pagination.pageSize !== pageSize) {
      getAllLeaveTypeData(0, pageSize);
    } else {
      getAllLeaveTypeData(pageNumber, pageSize);
    }
};

useEffect(() => {
  getAllLeaveTypeData(pagination.pageNumber, pagination.pageSize);
}, [pagination.pageNumber, pagination.pageSize]);
const getAllLeaveTypeData = (pageNumber, pageSize) => {
  getAllLeaveType(pageNumber, pageSize).then((res: any) => {
      let data: [] = createData(res.results.Employee);
      setpagination({
          pageNumber: res.pagination.pageNumber,
          pageSize: res.pagination.pageSize,
          total: res.pagination.totalRecords,
      });
      setdataSource(data);
  });
};
const reloadTable = (res) => {
  setalert({ type: NOTIFICATION_TYPE.success, mesg: res.message });
  getAllLeaveTypeData(pagination.pageNumber, pagination.pageSize);
};

const handleError = (res) => {
  setalert({
      type: NOTIFICATION_TYPE.error,
      mesg: res.status.validationFailures[0].message,
  });
};

  // const [open, setOpen] = useState(false);
  // const [searchFields, setsearchFields] = useState({ type: "" });
  // const [sortField, setsortField] = React.useState({
  //   sortField: "id",
  //   direction: "DESC",
  // });
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const onTableSearch = (values, sortField) => {};
  const columns: Column[] = [
    {
      id: "type",
      label: "Type",
      minWidth: 180,
    },
    {
      id: "noticePeriod",
      label: "Notice period",
      minWidth: 180,
    },
    {
      id: "description",
      label: "Description",
      minWidth: 180,
    }
  ];

  return (
    <div>
      <PageTitleWrapper>
        <PageTitle
          heading="Leave Type"
          // name="Add LeaveType"
          subHeading="Master/LeaveType"
          isButton={false}
          // onclickButton={handleClickOpen}
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
        {/* <Modals
          modalTitle="Add LeaveType"
          modalWidth="25%"
          open={open}
          onClose={handleClose}
          modalBody={<AddEmployee />}
        /> */}
      </Container>
    </div>
  );
}

export default ManageLeaveType;
