import { Card, CardContent, Container, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import { Column } from "../../../components/atoms/Tables/TableInterface";
import { getAllEmployee } from "../Employee/ServiceEmployee";
import { getAllLeaveType, deleteLeaveType, getGeneralSettingByLeaveType, getAllGeneralSetting} from "./serviceLeaveType";
import { TableAction } from "src/components/atoms/Tables/TableAction";
import AddLeaveType from "./AddLeaveType";
import CustomizedNotification from 'src/util/CustomizedNotification';
import { getPermissionStatus, getSubordinatePrivileges, sampleFuc } from "src/util/permissionUtils";

function createData(data) {

  let convertData = data.map((post, index) => {
  //   let newfield = [];
  //   getLeaveDaysDurationSetting(post.leaveType.id).then((res: any) => {

  // let newfield = [];
  //     (res.data).map((leave) => {
  //       console.log({leave});
  //       newfield.push(leave);

  //     })

  //   });
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
      // leaveDaysDurationSettingDto: newfield,
      carryforwardCancellation: post.carryforwardCancellation,
    };
  });

  return convertData;
}


function ManageLeaveType() {

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
  useEffect(() => {
    getAllLeaveTypeData(pagination.pageNumber, pagination.pageSize);
    getGeneralSettingDataByLeaveType();

  }, [pagination.pageNumber, pagination.pageSize]);
  const handleClickOpen = () => {
    setaction('add');
    setOpen(true);
  };
  const editOnclick = (row) => {
    console.log(row);
    setaction('edit');
    seteditData(row);
    setOpen(true);

  };


  const [alert, setalert] = useState({
    type: "",
    mesg: "",
  });

  const LeaveTypes = getPermissionStatus("LeaveTypes");
  console.log("LeaveTypes", LeaveTypes);
  const SubLeaveTypes = getSubordinatePrivileges(LeaveTypes, "LeaveTypes");
  console.log("LeaveTypes.status", sampleFuc(SubLeaveTypes));
  console.log("ADD LeaveTypes status", sampleFuc(SubLeaveTypes).CRLT);


  const onChangePage = (pageNumber, pageSize) => {
    if (pagination.pageSize !== pageSize) {
      getAllLeaveTypeData(0, pageSize);
    } else {
      getAllLeaveTypeData(pageNumber, pageSize);
    }
  };



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
    setOpen(false);
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
      minWidth: 80,
    },
    {
      id: "description",
      label: "Description",
      minWidth: 180,
    }, {
      id: "action",
      label: "Action",
      width: 90,
      minWidth: 100,
      fixed: "right",
      align: "center",
      render: (value: any) => sampleFuc(SubLeaveTypes).UPLT &&
                              sampleFuc(SubLeaveTypes).DELT &&
        <TableAction rowData={value} 
        deleteOnclick={deleteOnclick} 
        editOnclick={editOnclick} />
    },
  ];

  return (
    <div>
      <PageTitleWrapper>
        <PageTitle 
          heading="Leave Type"
          subHeading="Master/LeaveType"
          name="Add LeaveType"
          isButton={sampleFuc(SubLeaveTypes).CRLT ? true : false}
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
          // onClose={handleClose}

          modalBody={<AddLeaveType setLeaveDays={leaveallocate} reloadTable={reloadTable}
            action={action}
            editData={editData}
            handleError={handleError} 
            handleClose={handleClose}/>}
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