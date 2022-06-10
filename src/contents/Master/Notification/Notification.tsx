import { Card, CardContent, Typography } from "@mui/material";
import { Box, display, margin } from "@mui/system";
import React from "react";
import { PageTitleWrapper } from "src/components/organism";
import INotification from "./InterfaceNotification";

function Notification(props) {
    const onClickHandler = () => {
        props.onClickHandler(() => {});
    };
    return (
        <div>
            <Card
                onClick={props.onClickHandler}
                sx={{
                    margin: 1,
                    height: 80,
                    cursor: "pointer",
                    backgroundColor: props.isNew,
                    "&:hover": {
                        border: "1px solid #1a8cff",
                        // backgroundColor: "primary.main",
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
                        {props.shortmsg}
                    </Typography>
                    <Box textAlign={"right"} marginTop={1.5}>
                        <Typography
                            sx={{ minWidth: 0, fontSize: 11, opacity: 0.7 }}
                            color={"textPrimary"}
                        >
                            {props.date}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}

export default Notification;
