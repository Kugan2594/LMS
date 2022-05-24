import {
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    TextField,
    Button,
    Input,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";

import Select from "src/components/atoms/controlls/Select";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import { FORM_VALIDATION, spaceValidation } from "src/util/ValidationMeassage";
import { IDesignations } from "./DesignationsInterface";

function AddDesignation(props) {
    const handleClickOpen = (value) => {
        setOpen(true);
    };
    const [open, setOpen] = useState(false);

    const [designation, setDesignation] = useState("");
    const [error, setError] = useState(false);
    const onChangeHandler = (e) => {
        props.designationChange(e.target.value);
    };
    const handleClose = (e) => {
        setError(false);
        if (designation === "") {
            setError(true);
        } else {
            setOpen(false);
            setDesignation("");
        }
    };
    const editOnclick = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <div>
            <TextField
                id="designation-name-basic"
                type="text"
                variant="outlined"
                value={props.designationValue}
                error={props.error}
                onChange={onChangeHandler}
                sx={{ width: "200px" }}
            />
        </div>
    );
}

export default AddDesignation;
