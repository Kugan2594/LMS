import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert ref={ref} {...props} />;
});
interface notifType {
    vertical?: 'top';
    horizontal?: 'right';
}

export default function CustomizedNotification(props) {
    const { severity, handleAlertClose, message } = props;
    const [open, setOpen] = React.useState(false);
    const [state] = React.useState<notifType>({
        vertical: 'top',
        horizontal: 'right'
    });
    const { vertical, horizontal } = state;

    React.useEffect(() => {
        handleClick();
    }, [severity]);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        handleAlertClose();
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical, horizontal }}
                key={vertical + horizontal}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
