import {
    Box,
    Card,
    CardContent,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import ViewHistory from "../History/ViewHistory";
import INotification from "./InterfaceNotification";
import { getUserDetails } from "src/contents/login/LoginAuthentication";
import { getNotification } from "./NotificationService";

function ManageNotification(props: INotification) {
    const [leaveDetails, setLeaveDetails] = useState({});
    const [openDetails, setOpenDetails] = useState(false);
    const [pagination, setpagination] = useState({
        pageNumber: 0,
        pageSize: 20,
        total: 0,
    });
    const [notifications, setNotifications]: any = useState([]);

    var userName = getUserDetails().user_name;

    useEffect(() => {
        getAllNotificationByEmail(
            pagination.pageNumber,
            pagination.pageSize,
            userName
        );
    }, []);

    const getAllNotificationByEmail = (page, rowsPerPage, email) => {
        let notificData = [];
        getNotification(page, rowsPerPage, email).then((res: any) => {
            res.results.NotificationByUserEmail.map((post: any) => {
                notificData.push({
                    id: post.id,
                    shortmsg: post.shortmsg,
                    detailsmsg: post.detailsmsg,
                    read: post.read,
                });
            });
            setpagination({
                pageNumber: res.pagination.pageNumber,
                pageSize: res.pagination.pageSize,
                total: res.pagination.totalRecords,
            });
            setNotifications(notificData);
        });
    };

    const handleOpenLeaveDetails = (data) => {
        setOpenDetails(true);
        setLeaveDetails(data);
    };

    const handleClose = () => {
        setOpenDetails(false);
    };

    return (
        <div>
            {props.isTitle && (
                <PageTitleWrapper>
                    <PageTitle
                        heading="Notifications"
                        subHeading="Master/notifications"
                        isButton={false}
                    />
                </PageTitleWrapper>
            )}

            {props.isDivider && <Divider />}

            <Box marginTop={2}>
                <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={5}>
                        {notifications.map((post, index) => {
                            return (
                                <div>
                                    <Card
                                        onClick={() => {
                                            handleOpenLeaveDetails(post);
                                        }}
                                        sx={{
                                            margin: 1,
                                            height: 80,
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
                                                marginTop={1.5}
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
                                                        ? "Read"
                                                        : "Unread"}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </Grid>
                </Grid>
            </Box>
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

export default ManageNotification;
