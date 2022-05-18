import React from "react";
import { Button as MuiButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { AnySet } from "immer/dist/internal";

const useStyles: Function = makeStyles((theme) => ({
  root: {
    margin: "5px",
    padding: "5px",
  },
  label: {
    textTransform: "none",
  },
}));

const Button = (props: any) => {
  const {
    type,
    text,
    size,
    color,
    variant,
    onClick,
    disabled,
    style,
    ...other
  } = props;
  const classes = useStyles();

  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      type={type}
      {...other}
      style={{ margin: "2px", ...style }}
      classes={{ root: classes.root, label: classes.label }}
      disabled={disabled}
    >
      {text}
    </MuiButton>
  );
};
export default Button;
Button.propTypes = {
  onClick: PropTypes.func.isRequired || undefined,
  text: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  other: PropTypes.object,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};
