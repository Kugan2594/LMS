import { useContext, useState } from "react";

import {
    Badge,
    Box,
    Button,
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
import React, {useEffect } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import ViewHistory from "src/contents/Master/History/ViewHistory";
import { useNavigate } from "react-router";
import { SYSTEM_CONFIG } from "src/util/StytemConfig";
import {Stomp}  from '@stomp/stompjs';
import SockJS from "sockjs-client";

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

    const handleNotificationOpen = () => {
        setNotifi(true);
        console.log(mockData);
    };
    const handlClose = () => {
        setNotifi(false);
    };

    const mockData = [
        {
            //employeeName: "kuru",
            shortmsg: "You have received leave request",
            date: new Date("Mar 25 2015"),
            id: "1",
            status: false,
            leaveRequestId: 9,
        },
        {
            //employeeName: "sam",
            shortmsg: "You have received leave request from  Kuruparan",
            date: new Date("Mar 25 2015"),
            id: "2",
            status: false,
            leaveRequestId: 6,
        },
        {
            //employeeName: "mike",
            shortmsg: "Your leave request is Approved by dfxdf",
            date: new Date("Mar 25 2015"),
            id: "3",
            status: true,
            leaveRequestId: 6,
        },
        {
            // employeeName: "vagh",
            shortmsg: "Your leave request is Approved by dfxdf",
            date: new Date("Mar 25 2015"),
            id: "4",
            status: true,
            leaveRequestId: 6,
        },
        {
            // employeeName: "vagh",
            shortmsg: "5 You have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "5",
            status: false,
            leaveRequestId: 6,
        },
    ];
    const [mockDetail, setMockDetail] = useState(mockData);

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
        setOpenDetails(false);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const viewAllNotification = () => {
            navigate("/master/notifications");
            setAnchorEl(null);
    }

    const isNewNotification = (index) => {
        return mockDetail[index].status === false;
      };

      const [leaveDetails, setLeaveDetails] = useState({});
      const [openDetails, setOpenDetails] = useState(false);

      const handleOpenLeaveDetails = (data) => {
        console.log("NNNNNNNN.... ",data)
        setOpenDetails(true);
        setLeaveDetails(data);
      };

      const [count, setCount] = useState(mockData.filter((notification) => notification.status == false));
    
    useEffect(() => {
        WebSocketClient();
    }, []);

    const WebSocketClient= () => {
        var sock=new SockJS(SYSTEM_CONFIG.webSocketUrl);
        let stompClient=Stomp.over(sock);
        sock.onopen=function (){};
        return new Promise((resolve,reject)=>{
           stompClient.connect({},(frame)=>{
               stompClient.subscribe( 
                   "/queue/leaverequest",
                   (data)=>{
                   resolve(data);
                   let dataH=JSON.parse(data.body);
                   console.log("conneted",dataH);
               },);
           }) ;
           stompClient.activate()
        })
    }
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
                        <Badge badgeContent={count.length} color="primary" sx={{width: "30px", height: "30px"}}>
                            <IconButton onClick={handleClick}>
                                <NotificationsRoundedIcon />
                            </IconButton>
                        </Badge>
                        <Popover
                            sx={{ alignItems: "left", marginTop: "16px" }}
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                        >
                            <Typography variant="h6" color="primary" sx={{textDecoration: "underline", cursor: "pointer"}} textAlign="right" margin="10px 30px 10px 10px" onClick={viewAllNotification}>View All</Typography>
                            <div>
                                {mockDetail.map((data, index) => {
                                        const cardProps: {
                                            background?: string;
                                          } = {};
                                          if (isNewNotification(index)) {
                                            cardProps.background = "rgba(26, 140, 255, 0.25)";
                                          }
                                
                                        return (
                                            <Notification
                                                isNew={cardProps}
                                                date={data.date.toLocaleString()}
                                                // employeeName={data.employeeName}
                                                shortmsg={data.shortmsg}
                                                key={data.id}
                                                onClickHandler={() =>
                                                    handleOpenLeaveDetails(data)
                                                }
                                                id={data.id}
                                            />
                                        );
                                    })}
                            </div>
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
            onClose={handleClose}
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
                  cancel={handleClose}
                />
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
    );
}

export default Header;
