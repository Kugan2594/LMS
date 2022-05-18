import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import PropTypes from "prop-types";
import { PureLightTheme } from "../../../theme/schemes/PureLightTheme";

export default function Select(props: any) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options,
    defaultValue,
    onValueChange,
    fullWidth = false,
    width = "100%",
    size = "medium",
    placeholder,
    isNone = false,
    disabled = false,
    inputProps = {},
    variant = "outlined",
  } = props;
  const onSelect = (value: any) => {
    console.log("hit", value);
    onChange && onChange(value);
    onValueChange && onValueChange(value);
  };
  return (
    <FormControl
      sx={{ height: PureLightTheme.spacing(9) }}
      variant="outlined"
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        fullWidth={fullWidth}
        size={size}
        variant={variant}
        label={label}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        value={value === undefined ? "" : value}
        onChange={onSelect}
        style={{ width: width }}
        disabled={disabled}
        inputProps={inputProps}
      >
        {isNone && <MenuItem value="">None</MenuItem>}
        {options.map((item: any) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && (
        <FormHelperText>
          {" "}
          <div style={{ fontSize: "12px" }}>{error}</div>
        </FormHelperText>
      )}
    </FormControl>
  );
}
Select.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  onValueChange: PropTypes.func,
  fullWidth: PropTypes.bool,
  width: PropTypes.string,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  isNone: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  inputProps: PropTypes.object,
  variant: PropTypes.string,
};
