import { Badge, IconButton } from "@mui/material";
import React from "react";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { Box } from "@mui/system";
function NotificationBadge(props) {
    return (
        <div>
            <Box>
                <Badge badgeContent={4} color="primary">
                    <IconButton aria-label="delete" onClick={props.handleOpen}>
                        <NotificationsRoundedIcon />
                    </IconButton>
                </Badge>
            </Box>
        </div>
    );
}

export default NotificationBadge;
