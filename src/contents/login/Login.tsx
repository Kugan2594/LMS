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
import { NOTIFICATION_TYPE } from 'src/util/Notification';
import jwt_decode from 'jwt-decode';
import CustomizedNotification from 'src/util/CustomizedNotification';
import { signIn } from './ServiceLogin';
import {
    getAllPermissionByRoleIdInLogin,
    getRoleIdByRoleName
} from '../Permission/ServiceRolePermission';
import {
    getUserDetails,
    setAuthentication,
    setToken,
    setUserDetails,
    setUserName,
    setUserRolePermission
} from './LoginAuthentication';
import "./loginPage.scss";

const theme = createTheme();

let errStyle = {
    color: "#ff1943",
    fontSize: "12px",
    marginLeft: "12px",
    marginTop: "-8px",
};

export default function Login() {
    let navigate = useNavigate();
    const [showPassword, setshowPassword] = React.useState(false);
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [loading, setloading] = React.useState(false);

    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    };

    const [alert, setalert] = React.useState({
        type: '',
        mesg: ''
    });
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleAlertClose = () => {
        setalert({
            type: '',
            mesg: ''
        });
    };

    const getAllPermission = (roleId) => {
     
        getRoleIdByRoleName(roleId).then((res:any)=>{

            getAllPermissionByRoleIdInLogin(res.results.role.id).then((res: any) => {
                let permission = res;
                let permissionData = permission.map((post: any) => {
                    return {
                        name: post.permission.name,
                        id: post.permission.id,
                        status: post.permission.status,
                    };
                });
                console.log("^^^^^^^^^^^^^^^^^^^^^^",permissionData);
                setUserRolePermission(permissionData);
                setTimeout(() => {
                    setloading(false);
    
                    //navigate('master');
                  //  window.location.reload();
                }, 300);
            });
        })
       
     
    };

    const onChangeTextField = (e) => {
        setEmailError("");
    };
    const handleError = (res) => {
        console.log('msg------->', res);
        setalert({
            type: NOTIFICATION_TYPE.error,
            mesg:
                res.error_description === 'User is disabled'
                    ? 'Your account has been temporarily deactivated'
                    : res.error === 'access_denied'
                        ? "User don't have permisson for web"
                        : 'Incorrect username or password'
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        let emailId = data.get('email').toString();
        let body = {
            userName: data.get('email'),
            password: data.get('password')
        };
        console.log(body);

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
        }
        else {
            console.log({ body });
            setloading(true);
            signIn(body).then(
                (res: any) => {
                    let response = res.data;
                    console.log({response});
                    var decoded_token: any = jwt_decode(response.access_token);
                    setalert({
                        type: NOTIFICATION_TYPE.success,
                        mesg: 'Successfully logged in'
                    });
                    if (response.access_token) {
                        setAuthentication('true');
                        setToken(response.access_token);
                        console.log('decoded_token', decoded_token);
                        let userdata = {
                            user_name: decoded_token.user_name,
                            user_id: decoded_token.userId,
                            firstName: decoded_token.firstName,
                            roleId: decoded_token.roleId,
                            roleName:decoded_token.authorities && decoded_token.authorities[0],
                        };
                        getAllPermission(decoded_token.authorities[0]);
                        setUserName(userdata.firstName);
                        setUserDetails(JSON.stringify(userdata));
                    }
                    // console.log(getUserDetails());
                    console.log(res);
                },
                (error) => {
                    console.log(error.data);

                    handleError(error.data);
                    setloading(false);
                    setAuthentication('false');
                }
            );
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
                                    Sign in
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
                                        Sign In
                                    </LoadingButton>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                    </Grid>
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
                    </ThemeProvider>
                </Grid>
            </Grid>
        </div>
    );
}
