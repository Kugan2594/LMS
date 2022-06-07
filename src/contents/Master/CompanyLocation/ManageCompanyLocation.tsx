import { Card, CardContent, Container, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import Modals from "src/components/atoms/Modals";
import Tables from "src/components/atoms/Tables";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { Column } from "../../../components/atoms/Tables/TableInterface";
import AddCompanyLocation from "./AddCompanyLocation";
import { TableAction } from "src/components/atoms/Tables/TableAction";
import {
  deleteCompanyLocation,
  getAllCompanyLocation,
} from "./ServiceCompanyLocation";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import CustomizedNotification from 'src/util/CustomizedNotification';
import moment from "moment";
import { getPermissionStatus, getSubordinatePrivileges, sampleFuc } from "src/util/permissionUtils";
function createData(data) {
    let convertData = data.map((post, index) => {
        return {
            id: post.id,
            location: post.location,
            createdAt:moment(post.createdAt).format("YYYY-MM-DD"),
            updatedAt:moment(post.updatedAt).format("YYYY-MM-DD")

        };
    });
    return convertData;
}

function ManageCompanyLocation() {
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
  const SubCompanyLocation = getSubordinatePrivileges(Settings, "Location");
  console.log(" Settings .status", sampleFuc(SubCompanyLocation));
  console.log("ADD Settings status", sampleFuc(SubCompanyLocation).CRHL);


  useEffect(() => {
    getAllCompanyLocationData(pagination.pageNumber, pagination.pageSize);
  }, [pagination.pageNumber, pagination.pageSize]);
  const getAllCompanyLocationData = (pageNumber, pageSize) => {
    getAllCompanyLocation(pageNumber, pageSize).then((res: any) => {
      let data: [] = createData(res.results.Company_Location);
      setpagination({
        pageNumber: res.pagination.pageNumber,
        pageSize: res.pagination.pageSize,
        total: res.pagination.totalRecords,
      });
      console.log("ppppppppppppppppp", data);
      setdataSource(data);
    });
  };
  const reloadTable = (res) => {
    console.log("ppppppppppppppppp", res);
    setalert({ type: NOTIFICATION_TYPE.success, mesg: res.data.message });
    setOpen(false);
    getAllCompanyLocationData(pagination.pageNumber, pagination.pageSize);
  };

  const columns: Column[] = [
    {
      id: "location",
      label: "Company Location",
      minWidth: 120,
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
      width: 90,
      minWidth: 0,
      fixed: "right",
      align: "center",
      render: (value: any) => 
      sampleFuc(SubCompanyLocation).UPCL &&
      sampleFuc(SubCompanyLocation).DECL &&
        <TableAction
          rowData={value}
          deleteOnclick={deleteOnclick}
          editOnclick={editOnclick}
        />

    },
  ];

  const [action, setaction] = useState("add");
  const handleClickOpen = (value) => {
    setaction("add");
    setOpen(true);
  };

  const [CompanyLocation, setCompanyLocation] = useState("");
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(false);
  const onChangeHandler = (companyLocationValue) => {
    setCompanyLocation(companyLocationValue);
    console.log(CompanyLocation);
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
    deleteCompanyLocation(row.id).then(
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
    if (CompanyLocation === "") {
      setError(true);
    } else {
      setUpdate(false);
      setCompanyLocation("");
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
      {/* sampleFuc(SubCompanyLocation).CRCL && */}
      <PageTitleWrapper>
        <PageTitle
          heading="Company Location"
          name="Add Company Location"
          subHeading="Master/Company Location"
          isButton={sampleFuc(SubCompanyLocation).CRCL ? false : true}
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
            action === "edit" ? "Edit CompanyLocation" : "Add CompanyLocation"
          }
          modalWidth="25%"
          open={open}
          // onClose={handleClose}
          modalBody={
            <AddCompanyLocation
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

export default ManageCompanyLocation;
