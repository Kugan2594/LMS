import { useContext, useState } from "react";

import {
    Badge,
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Hidden,
    IconButton,
    Modal,
    Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { getUserDetails } from "src/contents/login/LoginAuthentication";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import HeaderButtons from "./Buttons";
import HeaderUserbox from "./Userbox";
import { SidebarContext } from "../../../context/SidebarContext";
import Notification from "src/contents/Master/Notification/Notification";
import Modals from "src/components/atoms/Modals";
import ManageNotification from "src/contents/Master/Notification/ManageNotification";
// import Logo from 'src/components/atomic/Logo';
// import * as React from "react";
import React, { useEffect } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import ViewHistory from "src/contents/Master/History/ViewHistory";
import { useNavigate } from "react-router";
import { SYSTEM_CONFIG } from "src/util/StytemConfig";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getUserByEmail } from "src/contents/Master/LeaveRequest/ServiceLeaveRequest";
import { getAllNotification } from "./NotificationService";
const HeaderWrapper = styled(Box)(
    ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 5;
        background-color: ${theme.header.background};
        box-shadow: ${theme.header.boxShadow};
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

function Header() {
    let navigate = useNavigate();
    const [notifi, setNotifi] = useState(false);
    const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
    const [notifications, setNotifications]: any = useState([]);
    const [leaveDetails, setLeaveDetails] = useState({});
    const [openDetails, setOpenDetails] = useState(false);
    const [count, setCount] = useState(0);
    const [pagination, setpagination] = useState({
        pageNumber: 0,
        pageSize: 20,
        total: 0,
    });

    const handleNotificationOpen = () => {
        setNotifi(true);
        console.log(notifications);
    };
    const handlClose = () => {
        setNotifi(false);
    };


    const [mockDetail, setMockDetail] = useState(notifications);

    const ClickHandler = (index) => {
        let pId = mockDetail.findIndex((m) => {
            return m.id === index;
        });
        console.log("clicked");
        let detail = mockDetail[pId];
        detail.status = true;
        const mockData1 = [...mockDetail];
        mockData1[pId] = detail;
        setMockDetail(mockData1);
        console.log(
            "......." +
                mockDetail.map((m) => {
                    return m.status;
                })
        );
    };

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const viewAllNotification = () => {
        navigate("/master/notifications");
        setAnchorEl(null);
    };

    const handleOpenLeaveDetails = (data) => {
        console.log("NNNNNNNN.... ", data);
        setOpenDetails(true);
        setLeaveDetails(data);
    };

    const handleCloseLeaveDetails = () => {
        setOpenDetails(false);
    };

    useEffect(() => {
        WebSocketClient(
            `/user/${getUserDetails().user_name}/queue/leaverequest`
        );
        getAllNotificationByEmail(
            pagination.pageNumber,
            pagination.pageSize,
            getUserDetails().user_name
        );
    }, []);
    const getAllNotificationByEmail = (pageNumber, pageSize, email) => {
        let count = 0;
        let data = [];
        getAllNotification(pageNumber, pageSize, email).then((res: any) => {
            res.results.NotificationByUserEmail.map((post: any, index) => {
                data.push({
                    id: post.id,
                    shortmsg: post.shortmsg,
                    detailsmsg: post.detailsmsg,
                    read: post.read,
                    leaveRequestId: post.leaveRequestId
                });
                count++;
            });
            setpagination({
                pageNumber: res.pagination.pageNumber,
                pageSize: res.pagination.pageSize,
                total: res.pagination.totalRecords,
            });
            setNotifications(data.sort((a,b) => b.id - a.id));
            setCount(count);
        });
    };

    const WebSocketClient = (url) => {
        var sock = new SockJS(SYSTEM_CONFIG.webSocketUrl);
        let stompClient = Stomp.over(sock);
        sock.onopen = function () {};
        return new Promise((resolve, reject) => {
            stompClient.connect({}, (frame) => {
                stompClient.subscribe(url, (data) => {
                    resolve(data);
                    let dataH = JSON.parse(data.body);
                    console.log("conneted", dataH);
                });
            });
            stompClient.activate();
        });
    };

    return (
        <div>
            <HeaderWrapper display="flex" alignItems="center">
                <Box display="flex" alignItems="center">
                    <Hidden lgUp>
                        <h1>LMS</h1>
                    </Hidden>
                </Box>
                <Box display="flex" alignItems="center">
                    {/* <HeaderButtons /> */}
                    <Box>
                        <Badge
                            badgeContent={count}
                            color="primary"
                            sx={{ width: "30px", height: "30px" }}
                        >
                            <IconButton onClick={handleClick}>
                                <NotificationsRoundedIcon />
                            </IconButton>
                        </Badge>

                        <Popover
                            sx={{
                                alignItems: "left",
                                marginTop: "16px",
                            }}
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                        >
                            {notifications.map((post, index) => {
                                return (
                                    <div>
                                        <Card
                                            onClick={() => {
                                                handleOpenLeaveDetails(post);
                                            }}
                                            sx={{
                                                margin: 1,
                                                height: 60,
                                                cursor: "pointer",
                                                backgroundColor:
                                                    post.read &&
                                                    "rgba(26, 140, 255, 0.25)",
                                                "&:hover": {
                                                    border: "1px solid #1a8cff",
                                                },
                                            }}
                                        >
                                            <CardContent>
                                                <Typography
                                                    sx={{ minWidth: 0 }}
                                                    variant={"h6"}
                                                    color={"textSecondary"}
                                                    paddingLeft={0.5}
                                                >
                                                    {post.shortmsg}
                                                </Typography>
                                                <Box
                                                    textAlign={"right"}
                                                    marginTop={0.5}
                                                >
                                                    <Typography
                                                        sx={{
                                                            minWidth: 0,
                                                            fontSize: 11,
                                                            opacity: 0.7,
                                                        }}
                                                        color={"textPrimary"}
                                                    >
                                                        {post.read
                                                            ? "Unread"
                                                            : "Read"}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </div>
                                );
                            })}
                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                }}
                                textAlign="right"
                                margin="10px 30px 10px 10px"
                                onClick={viewAllNotification}
                            >
                                View All
                            </Typography>
                        </Popover>
                    </Box>
                    <Box marginLeft={2}>
                        <HeaderUserbox />
                    </Box>
                    <Hidden lgUp>
                        <Tooltip arrow title="Toggle Menu">
                            <IconButton color="primary" onClick={toggleSidebar}>
                                {!sidebarToggle ? (
                                    <MenuTwoToneIcon />
                                ) : (
                                    <CloseTwoToneIcon />
                                )}
                            </IconButton>
                        </Tooltip>
                    </Hidden>
                </Box>
            </HeaderWrapper>
            <Dialog
                open={openDetails}
                onClose={handleCloseLeaveDetails}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
            >
                <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <ViewHistory
                            details={leaveDetails}
                            isEmployeeDetail={true}
                            isResponseButtons={false}
                            cancel={handleCloseLeaveDetails}
                        />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Header;
