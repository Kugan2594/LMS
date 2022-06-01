import { Card, CardContent, Typography } from "@mui/material";
import { Box, display, margin } from "@mui/system";
import React from "react";
import INotification from "./InterfaceNotification";

function Notification(props) {
    return (
        <div>
            <Card sx={{ width: 400, margin: 0.5 }}>
                <Typography sx={{ minWidth: 0 }}> Notification</Typography>
                <CardContent>
                    <Typography sx={{ minWidth: 0 }}>
                        <Box> {props.employeeName}</Box>
                        <Box>{props.shortmsg}</Box>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Notification;
