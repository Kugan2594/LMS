import PropTypes from "prop-types";
import {
  Box,
  CardContent,
  CardActions,
  Card,
  CardHeader,
  Avatar,
  Divider,
  Grid,
  IconButton,
  CardActionArea,
  Typography,
  Button,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";

import React, { useEffect, useState } from "react";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import Input from "src/components/atoms/controlls/Input";

import AutocompleteSelect from "src/components/atoms/controlls/AutocompleteSelect";

import { changeUserPassword } from "./ServiceUser";
import { IUser } from "./User.interface";
import MuiButton from "src/components/atoms/controlls/Button";
import { makeStyles } from "@mui/styles";
import {
  EditOutlined,
  EditOffOutlined,
  Label,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import Modals from "src/components/atoms/Modals";
import { useNavigate } from "react-router";
import CustomizedNotification from "src/util/CustomizedNotification";

const initialFValues: IUser = {
  id: 0,
  firstname: "",
  lastName: "",
  gender: "",
  nic: "",
  address: "",
  mobileNumber: "",
  email: "",
  userStatus: "",
  userType: "",
};

function createData(data) {
  let convertData = {
    id: data.id,
    lastName: data.lastName,
    firstname: data.firstname,
    fullName: data.fullName,
    nic: data.nic,
    address: data.address,
    mobileNumber: data.mobileNumber,
    gender: data.gender,
    email: data.email,
    userStatus: data.userStatus,
    userType: data.userType,
  };

  return convertData;
}
const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
];

const roleItems = [
  { id: "COMPANYADMIN", title: "Company Admin" },
  { id: "COMPANYBRANCHADMIN", title: "Branch Admin" },
];

const roleItemsTwo = [
  { id: "COMPANYADMIN", title: "Company Admin" },
  { id: "COMPANYBRANCHADMIN", title: "Branch Admin" },
];
const statusItems = [
  { id: "NEW", title: "New" },
  { id: "ACTIVE", title: "Active" },
  { id: "INACTIVE", title: "Inactive" },
];
const statusItemsTwo = [{ id: "ACTIVE", title: "Active" }];

const useStyles: any = makeStyles(() => ({
  noBorder: {
    border: "none",
  },
}));
// "standard"
const Profile = (props) => {
  let navigate = useNavigate();

  const { reloadTable, editData } = props;
  const [alert, setalert] = useState({
    type: "",
    mesg: "",
  });
  const [showPassword, setshowPassword] = React.useState(false);
  const [showPasswordTwo, setshowPasswordTwo] = React.useState(false);
  const [showPasswordThree, setshowPasswordThree] = React.useState(false);

  const [editDataFrom, seteditDataFrom] = useState<any>({});
  const [companyBranchesData, setcompanyBranchesData] = useState([]);
  const [companyData, setcompanyData] = useState([]);
  const [action, setaction] = useState("edit");
  const [updateStatus, setupdateStatus] = useState(true);
  const [isEdit, setIsEdit] = useState({
    variant: "standard",
    disableUnderline: true,
  });
  const [formData, setFormData] = React.useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordErrors, setpasswordErrors] = React.useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [open, setOpen] = useState(false);

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleClickShowPasswordTwo = () => {
    setshowPasswordTwo(!showPasswordTwo);
  };
  const handleClickShowPasswordThree = () => {
    setshowPasswordThree(!showPasswordThree);
  };

  const onChangeFormValue = () => {
    setupdateStatus(false);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    let nameArry = name.split(" ");
    console.log(nameArry);

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children:
        nameArry.length > 1
          ? `${nameArry[0][0].toUpperCase()} ${nameArry[1][0].toUpperCase()}`
          : `${nameArry[0][0].toUpperCase()}`,
    };
  }

  const handleAlertClose = () => {
    setalert({
      type: "",
      mesg: "",
    });
  };
  const openChangePassword = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [event.target.name]: event.target.value });

    setpasswordErrors({
      currentPassword: "",
      password: "",
      confirmPassword: "",
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onResetChangePassword = () => {
    setFormData({
      currentPassword: "",
      password: "",
      confirmPassword: "",
    });
    setpasswordErrors({
      currentPassword: "",
      password: "",
      confirmPassword: "",
    });
  };
  const changePassword = () => {
    const { confirmPassword, currentPassword, password } = formData;
    if (confirmPassword === "" && currentPassword === "" && password === "") {
      setpasswordErrors({
        currentPassword: "This field is required",
        password: "This field is required",
        confirmPassword: "This field is required",
      });
    } else if (currentPassword === "") {
      setpasswordErrors({
        currentPassword: "Current password is required",
        password: "",
        confirmPassword: "",
      });
    } else if (password === "") {
      setpasswordErrors({
        currentPassword: "",
        password: "Password is required",
        confirmPassword: "",
      });
    } else if (password.length < 6) {
      setpasswordErrors({
        ...passwordErrors,
        password: "Password must be at least 6 characters",
      });
    } else if (confirmPassword === "") {
      setpasswordErrors({
        currentPassword: "",
        password: "",
        confirmPassword: "Password confirmation is required",
      });
    } else {
      if (password !== confirmPassword) {
        setpasswordErrors({
          ...passwordErrors,
          confirmPassword: "Password and confirm paswsord must match",
        });
      } else if (
        passwordErrors.password === "" &&
        passwordErrors.currentPassword === "" &&
        passwordErrors.confirmPassword === ""
      ) {
        let data = {
          // id: user.user_id,
          oldPassword: currentPassword,
          newPassword: password,
        };

        console.log("postData----->", data);

        changeUserPassword(data).then(
          (res: any) => {
            console.log(res);
            // setalert({
            //   type: NOTIFICATION_TYPE.success,
            //   mesg: res.data.message
            // });
            setOpen(false);
          },
          (error) => {
            console.log(error);
            if (error.data.statusCode === "28002") {
              setpasswordErrors({
                ...passwordErrors,
                currentPassword: "Current password is invalid",
              });
            } else {
              // setalert({
              //   type: NOTIFICATION_TYPE.error,
              //   mesg: error.data.message
              // });
            }
          }
        );
      }
    }
  };

  const classes = useStyles();
  return (
    <>
      <Button
        variant="text"
        style={{ color: "rgb(156, 39, 176)" }}
        size="small"
        onClick={openChangePassword}
      >
        Change password
      </Button>

      <Modals
        modalTitle={"Change Password"}
        modalWidth="35%"
        open={open}
        onClose={handleClose}
        modalBody={
          <Grid container>
            <Grid item xs={12}>
              {" "}
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Current Password"
                name="currentPassword"
                // autoComplete=
                value={formData.currentPassword}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <Visibility style={{ fontSize: "16px" }} />
                        ) : (
                          <VisibilityOff style={{ fontSize: "16px" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoFocus
                onChange={(e) => handleChange(e)}
                helperText={passwordErrors.currentPassword}
                error={passwordErrors.currentPassword !== ""}
              />
            </Grid>
            <Grid item xs={12}>
              {" "}
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                name="password"
                value={formData.password}
                type={showPasswordTwo ? "text" : "password"}
                // autoComplete=

                onChange={(e) => handleChange(e)}
                helperText={passwordErrors.password}
                error={passwordErrors.password !== ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordTwo}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPasswordTwo ? (
                          <Visibility style={{ fontSize: "16px" }} />
                        ) : (
                          <VisibilityOff style={{ fontSize: "16px" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {" "}
              <TextField
                type={showPasswordThree ? "text" : "password"}
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                // autoComplete=
                onChange={(e) => handleChange(e)}
                helperText={passwordErrors.confirmPassword}
                error={passwordErrors.confirmPassword !== ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordThree}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPasswordThree ? (
                          <Visibility style={{ fontSize: "16px" }} />
                        ) : (
                          <VisibilityOff style={{ fontSize: "16px" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              container
              style={{ padding: "8px" }}
            >
              <div>
                <MuiButton
                  size="small"
                  color="secondary"
                  text="Reset"
                  onClick={onResetChangePassword}
                />

                <MuiButton
                  size="small"
                  type="submit"
                  text="Save"
                  onClick={changePassword}
                />
              </div>
            </Grid>
          </Grid>
        }
      />
      {alert.type.length > 0 ? (
        <CustomizedNotification
          severity={alert.type}
          message={alert.mesg}
          handleAlertClose={handleAlertClose}
        />
      ) : null}
    </>
  );
};

Profile.propTypes = {};

export default Profile;
