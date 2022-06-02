import { Card, CardContent, Typography } from "@mui/material";
import { Box, display, margin } from "@mui/system";
import React from "react";
import { PageTitleWrapper } from "src/components/organism";
import INotification from "./InterfaceNotification";

function Notification(props) {
    return (
        <div>
            <Card
                sx={{
                    width: 400,
                    margin: 0.5,
                    height: 80,
                    "&:hover": {
                        border: "1px solid #1a8cff",
                        // backgroundColor: "primary.main",
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                <CardContent>
                    <Typography
                        sx={{ minWidth: 0 }}
                        variant={"h6"}
                        color={"textSecondary"}
                        paddingLeft={2}
                    >
                        {props.shortmsg} from{" "}
                        <Typography
                            color={"primary"}
                            display="inline"
                            variant="h6"
                        >
                            {props.employeeName}
                        </Typography>
                    </Typography>
                    <Box textAlign={"right"} marginTop={1.5}>
                        <Typography
                            sx={{ minWidth: 0, fontSize: 10, opacity: 0.7 }}
                            color={"textPrimary"}
                        >
                            {" "}
                            {props.date}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}

export default Notification;
