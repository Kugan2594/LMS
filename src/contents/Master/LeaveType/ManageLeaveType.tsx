import { Card, CardContent, Container, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import { Column } from "../../../components/atoms/Tables/TableInterface";
import { getAllEmployee } from "../Employee/ServiceEmployee";
import { getAllLeaveType, deleteLeaveType, getGeneralSettingByLeaveType, getAllGeneralSetting, getLeaveDaysDurationSetting } from "./serviceLeaveType";
import { TableAction } from "src/components/atoms/Tables/TableAction";
import AddLeaveType from "./AddLeaveType";
import CustomizedNotification from 'src/util/CustomizedNotification';

function createData(data) {
  let newfield = [];
  let convertData = data.map((post, index) => {
    getLeaveDaysDurationSetting(post.leaveType.id).then((res: any) => {


      (res.data).map((leave) => {
        console.log("%%%%%%%%%%%%%%%%%%", leave);
        newfield.push(leave);

      })
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", newfield);
    });
    return {

      id: post.leaveType.id,
      type: post.leaveType.type,
      noticePeriod: post.leaveType.noticePeriod,
      description: post.leaveType.description,
      ableToCarryForward: post.ableToCarryForward,
      cancellationNoticePeriod: post.cancellationNoticePeriod,
      carryForwardExpiry: post.carryForwardExpiry,
      expiryDate: post.expiryDate,
      maxStretchDays: post.maxStretchDays,
      minStretchDays: post.minStretchDays,
      noOfDays: post.noOfDays,
      noOfDaysPeryear: post.noOfDaysPeryear,
      noticePeriodApplicable: post.noticePeriodApplicable,
      reginationNotified: post.reginationNotified,
      reminderGap: post.reminderGap,
      yearCompleted: post.yearCompleted,
      allocateDaysByAppointedDate: post.allocateDaysByAppointedDate,
      allocatedDaysByExtraWorking: post.allocatedDaysByExtraWorking,
      monthlyApplicable: post.monthlyApplicable,
      leaveDaysDurationSettingDto: newfield


    };
  });
  return convertData;
}


function ManageLeaveType() {
  const [leavedays, setLeaveDays] = useState([]);
  const [leaveallocate, setLeaveAllocate] = useState([]);
  const [action, setaction] = useState('add');
  const [open, setOpen] = useState(false);
  const [editData, seteditData] = useState({});
  const handleClose = () => {
    setOpen(false);
  };
  const [pagination, setpagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    total: 0,
  });
  const handleAlertClose = () => {
    setalert({
      type: '',
      mesg: ''
    });
  };
  const [dataSource, setdataSource] = useState([]);
  const handleClickOpen = () => {
    setaction('add');
    setOpen(true);
  };
  const editOnclick = (row) => {
    console.log(row);
    setaction('edit');
    seteditData(row);
    setOpen(true);
    getLeaveAllocated(row.id);
  };
  const getLeaveAllocated = (id: any) => {
    getLeaveDaysDurationSetting(id).then((res: any) => {
      let newfield = [];
      setLeaveDays(res.data);
      (res.data).map((leave) => {
        console.log("%%%%%%%%%%%%%%%%%%", leave);
        newfield.push(leave);

      })
      setLeaveAllocate(newfield);
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", newfield);

    });
  }
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
    getGeneralSettingDataByLeaveType();

  }, [pagination.pageNumber, pagination.pageSize]);

  const getGeneralSettingDataByLeaveType = () => {

  }

  const getAllLeaveTypeData = (pageNumber, pageSize) => {
    getAllGeneralSetting().then((res: any) => {

      let data: [] = createData(res.data);
      // setpagination({
      //   pageNumber: res.pagination.pageNumber,
      //   pageSize: res.pagination.pageSize,
      //   total: res.pagination.totalRecords,
      // });
      setdataSource(data);
    });


  };
  const reloadTable = (res) => {
    setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });
    getAllLeaveTypeData(pagination.pageNumber, pagination.pageSize);
  };

  const handleError = (res) => {
    setalert({
      type: NOTIFICATION_TYPE.error,
      mesg: res.data.validationFailures[0].message,
    });
  };
  const deleteOnclick = (row) => {
    deleteLeaveType(row.id).then(
      (res: any) => {
        reloadTable(res);
      },
      (error) => {
        console.log(error);
        handleError(error);
      }
    );
  };


  const onTableSearch = (values, sortField) => { };
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
    }, {
      id: "action",
      label: "Action",
      minWidth: 100,
      fixed: "right",
      align: "center",
      render: (value: any) => (
        <TableAction rowData={value} deleteOnclick={deleteOnclick} editOnclick={editOnclick} />
      ),
    },
  ];

  return (
    <div>
      <PageTitleWrapper>
        <PageTitle
          heading="Leave Type"
          subHeading="Master/LeaveType"
          name="Add LeaveType"
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
          modalTitle={action === 'edit' ? 'Edit leaveType' : 'Add LeaveType'}
          modalWidth="50%"
          open={open}
          onClose={handleClose}

          modalBody={<AddLeaveType setLeaveDays={leaveallocate} reloadTable={reloadTable}
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

export default ManageLeaveType;
