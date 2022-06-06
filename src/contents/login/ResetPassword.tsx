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
import { resetPasswordApi } from "./ServiceForgotPassword";
import { useForm } from "src/components/atoms/Forms/useForm";

const theme = createTheme();

let errStyle = {
    color: "#ff1943",
    fontSize: "12px",
    marginLeft: "12px",
    marginTop: "-8px",
};

export default function ResetPassword() {
    let navigate = useNavigate();
    const [showPassword, setshowPassword] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState("");
    const [loading, setloading] = React.useState(false);

    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onChangeTextField = (e) => {
        setPasswordError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let token = data.get("token").toString();
        let password = data.get("password").toString();
        let value = {
            token: token,
            password: password,
        };

        console.log({
            token,
            password,
        });
        if (data.get("password") === "") {
            setPasswordError("Password can't be null!");
        } else {
            resetPasswordApi(value);
            setloading(true);
            navigate("/");
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
                                    paddingBottom: 5,
                                }}
                            >
                                <Avatar
                                    sx={{ m: 1, bgcolor: "secondary.main" }}
                                >
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Reset Password
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
                                        label="Token"
                                        name="token"
                                        autoComplete="token"
                                        onChange={onChangeTextField}
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <Visibility
                                                                style={{
                                                                    fontSize:
                                                                        "16px",
                                                                }}
                                                            />
                                                        ) : (
                                                            <VisibilityOff
                                                                style={{
                                                                    fontSize:
                                                                        "16px",
                                                                }}
                                                            />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        id="password"
                                        autoComplete="current-password"
                                        error={passwordError ? true : false}
                                    />
                                    {passwordError && (
                                        <div style={errStyle}>
                                            {passwordError}
                                        </div>
                                    )}
                                    <LoadingButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        color="primary"
                                        loading={loading}
                                    >
                                        Reset
                                    </LoadingButton>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </Grid>
            </Grid>
        </div>
    );
}
