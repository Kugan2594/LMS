import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Divider, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { userVerification } from "./ServiceLogin";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import CustomizedNotification from "src/util/CustomizedNotification";

export default function UserVerification() {
  const theme = useTheme();
  let navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    verifyCode: "",
  });
  const [alert, setalert] = useState({
    type: "",
    mesg: "",
  });
  const [errors, setErrors] = useState({
    verifyCode: "",
  });
  const handleAlertClose = () => {
    setalert({
      type: "",
      mesg: "",
    });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({
      verifyCode: "",
    });
  };

  const handleSubmit = () => {
    const { verifyCode } = formData;

    if (verifyCode === "") {
      setErrors({ ...errors, verifyCode: "Verify code is required" });
    } else {
      userVerification(
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf("/") + 1
        ),
        verifyCode
      ).then(
        (res: any) => {
          console.log(res);
          setalert({ type: NOTIFICATION_TYPE.error, mesg: res.data.message });
          navigate("/");
        },
        (error) => {
          setalert({ type: NOTIFICATION_TYPE.error, mesg: error.data.message });
        }
      );
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            width: 500,
            position: "relative",
            minHeight: 200,
            padding: 3,
          }}
        >
          <Typography variant="h1" component="h2">
            Verification Confirmation Message
          </Typography>
          <Divider />
          <Box
            sx={{
              marginTop: 3,
            }}
          >
            <Typography variant="h4" component="h5">
              Click the Confirm Button{" "}
            </Typography>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 5, mb: 0 }}
            onClick={() => handleSubmit()}
          >
            Confirm
          </Button>
        </Box>
      </Box>
      {alert.type.length > 0 ? (
        <CustomizedNotification
          severity={alert.type}
          message={alert.mesg}
          handleAlertClose={handleAlertClose}
        />
      ) : null}
    </Container>
  );
}
