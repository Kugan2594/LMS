import React, { useState, useEffect, useRef } from "react";
import { getEmployeeIdByEmail, getApprovalStatusById } from './../../../../contents/Dashboard/ServiceEmployeeLeaveRequestHistory';
import { NavLink } from "react-router-dom";

import {
    Avatar,
    Box,
    Button,
    Divider,
    Hidden,
    lighten,
    List,
    ListItem,
    ListItemText,
    Popover,
    Tooltip,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InboxTwoToneIcon from "@mui/icons-material/InboxTwoTone";
import { styled } from "@mui/material/styles";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import {
    getUserDetails,
} from './../../../../contents/login/LoginAuthentication';
// import { MaleImage, User } from "./../../../../assets/images";
import {
    setAuthentication,
    setToken,
    setUserDetails,
    setUserRolePermission,
  } from "../../../../contents/login/LoginAuthentication";

import { red } from "@mui/material/colors";
import { SYSTEM_CONFIG } from "../../../../util/StytemConfig";

const UserBoxButton = styled(Button)(
    ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
    ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
    ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
    ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
    ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
    let navigate = useNavigate();
    // let userData = getUserDetails();
    // let userName = getUserName();
    const [employeeId, setEmployeeId] = useState(0);
    const [employeefirstname, setemployeefirstname] = useState("Admin");
    const ref = useRef<any>(null);
    const [isOpen, setOpen] = useState<boolean>(false);
    useEffect(() => {

        getEmployeeByEmail(getUserDetails().user_name);

    }, []);

    const getEmployeeByEmail = (email) => {
        getEmployeeIdByEmail(email).then((res: any) => {
            console.log("res", res);
            setEmployeeId(res.employee.id);
            getApprovalStatusById(res.employee.id).then((res: any) => {
                console.log("res", res);

                console.log("res.approverStatus", res.results.Employee.firstName);
                setemployeefirstname(res.results.Employee.firstName);
            });
        });

    };

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    const logOut = () => {
        setAuthentication('false');
        setUserRolePermission([]);
        setToken(null);
        setUserDetails(null);
        setTimeout(() => {
            navigate("/");
        }, 200);
    };

    const goDashBoard = (): void => {
        navigate("/master");
    };

    return (
        <>
            <Button onClick={goDashBoard}>Home</Button>
            <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
                <Tooltip arrow title="Company Logo">
                    <Avatar
                        variant="rounded"
                        alt="IIT"
                    // src={`${SYSTEM_CONFIG.baseUrl}/company-logos/${user.companyLogo}`}
                    />
                </Tooltip>
                <Hidden mdDown>
                    <UserBoxText>
                        <UserBoxLabel variant="body1">{employeefirstname}</UserBoxLabel>
                        <UserBoxDescription variant="body2">
                           
                        </UserBoxDescription>
                    </UserBoxText>
                </Hidden>
                <Hidden smDown>
                    <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
                </Hidden>
            </UserBoxButton>
            <Popover
                anchorEl={ref.current}
                onClose={handleClose}
                open={isOpen}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuUserBox sx={{ minWidth: 210 }} display="flex">
                    <Avatar
                        sx={{ bgcolor: red[500], width: 40, height: 40 }}
                        aria-label="recipe"
                        src={""}
                    />
                    <UserBoxText>
                        <UserBoxLabel variant="body1">{employeefirstname}</UserBoxLabel>
                        <UserBoxDescription variant="body2">
                            Invicta Innovations
                        </UserBoxDescription>
                    </UserBoxText>
                </MenuUserBox>
                <Divider sx={{ mb: 0 }} />
                <List sx={{ p: 1 }} component="nav">
                    <ListItem
                        button
                        to="/profile/profile"
                        component={NavLink}
                    >
                        <AccountBoxTwoToneIcon fontSize="small" />
                        <ListItemText primary="Change Password" />
                    </ListItem>

                    <ListItem
                        button
                        to="/management/emailpoints"
                        component={NavLink}
                    >
                        <MailOutlineIcon fontSize="small" />
                        <ListItemText primary="Email Configuration" />
                    </ListItem>

                    <ListItem
                        button
                        to="/dashboard/notification"
                        component={NavLink}
                    >
                        <InboxTwoToneIcon fontSize="small" />
                        <ListItemText primary="Notification" />
                    </ListItem>

                    <ListItem
                        button
                        to="/management/configuration"
                        component={NavLink}
                    >
                        <SettingsApplicationsIcon fontSize="small" />
                        <ListItemText primary="System Configuration" />
                    </ListItem>

                    {/* <ListItem
            button
            to="/management/profile/settings"
            component={NavLink}
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary="Account Settings" />
          </ListItem> */}
                </List>
                <Divider />
                <Box sx={{ m: 1 }}>
                    <Button color="primary" fullWidth onClick={logOut}>
                        <LockOpenTwoToneIcon sx={{ mr: 1 }} />
                        Sign out
                    </Button>
                </Box>
            </Popover>
        </>
    );
}

export default HeaderUserbox;
