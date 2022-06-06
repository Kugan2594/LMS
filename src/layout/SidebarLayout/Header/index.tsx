import { useContext, useState } from "react";

import {
    Badge,
    Box,
    Button,
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
import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

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
            shortmsg: " 1 you have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "1",
            status: false,
        },
        {
            //employeeName: "sam",
            shortmsg: "2 you have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "2",
            status: false,
        },
        {
            //employeeName: "mike",
            shortmsg: "3 you have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "3",
            status: true,
        },
        {
            // employeeName: "vagh",
            shortmsg: "4 You have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "4",
            status: true,
        },
        {
            // employeeName: "vagh",
            shortmsg: "4 You have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "5",
            status: true,
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
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
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
                        <Badge badgeContent={4} color="primary">
                            <IconButton onClick={handleClick}>
                                <NotificationsRoundedIcon />
                            </IconButton>
                        </Badge>
                        <Popover
                            sx={{ alignItems: "left" }}
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                        >
                            <div>
                                {mockDetail
                                    .filter((x) => x.status == false)
                                    .map((data, index) => {
                                        return (
                                            <Notification
                                                date={data.date.toLocaleString()}
                                                // employeeName={data.employeeName}
                                                shortmsg={data.shortmsg}
                                                key={data.id}
                                                onClickHandler={() =>
                                                    ClickHandler(data.id)
                                                }
                                                id={data.id}
                                            />
                                        );
                                    })}
                            </div>
                        </Popover>
                    </Box>
                    <HeaderUserbox />
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
        </div>
    );
}

export default Header;
