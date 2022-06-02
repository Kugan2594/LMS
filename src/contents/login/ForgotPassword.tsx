import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Animi } from "src/assets/login-main-bg.svg";
import "./loginPage.scss";
import { addItemApi } from "./ServiceForgotPassword";

const theme = createTheme();

let errStyle = {
    color: "#ff1943",
    fontSize: "12px",
    marginLeft: "12px",
    marginTop: "-8px",
};

export default function ForgotPassword() {
    let navigate = useNavigate();
    const [emailError, setEmailError] = React.useState("");
    const [loading, setloading] = React.useState(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onChangeTextField = (e) => {
        setEmailError("");
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let emailId = data.get("email").toString();
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
        if (data.get("email") === "") {
            setEmailError("Email is required");
        } else if (
            data.get("email") !== "" &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailId)
        ) {
            setEmailError("Email is not valid");
        } else {
            setloading(true);
            addItemApi(emailId);
            navigate("/reset-password");
        }
    };

    return (
        <div>
            <Grid
                container
                sx={{ width: "100wh", height: "100vh", overflow: "hidden" }}
            >
                <Grid item xs={7}>
                    <Animi />
                </Grid>
                <Grid item xs={5}>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 14,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    // boxShadow: 5,
                                    // borderRadius: 5,
                                    paddingBottom: 5,
                                }}
                            >
                                <Avatar
                                    sx={{ m: 1, bgcolor: "secondary.main" }}
                                >
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Forgot Password
                                </Typography>
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    noValidate
                                    sx={{ mt: 1, paddingX: 5 }}
                                >
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={onChangeTextField}
                                        autoFocus
                                        error={emailError ? true : false}
                                    />
                                    {emailError && (
                                        <div style={errStyle}>{emailError}</div>
                                    )}

                                    <LoadingButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        color="primary"
                                        loading={loading}
                                    >
                                        Send
                                    </LoadingButton>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="/" variant="body2">
                                                Already have an account ?
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </Grid>
            </Grid>
        </div>
    );
}
