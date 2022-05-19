import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { PureLightTheme } from 'src/theme/schemes/PureLightTheme';

export default function Input(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    type,
    InputLabelProps,
    width,
    placeholder,
    endAdornment,
    id,
    textFieldRef,
    onSelect,
    disabled,
    startAdornment,
    variant = 'outlined',
    customInputProps = {},
    inputProps = {},
    className,
    classes,
    inputclasses,
    disableUnderline = false,
    styles = {},
    tabIndex,
    helperText
  } = props;
  return (
    <>
      <TextField
        id={id}
        inputRef={textFieldRef}
        sx={{ width: width, height: PureLightTheme.spacing(9) }}
        variant={variant}
        label={label}
        name={name}
        size="medium"
        tabIndex={tabIndex}
        value={value}
        disabled={disabled}
        onChange={onChange}
        classes={classes}
        type={type}
        style={styles}
        onSelect={onSelect}
        className={className}
        placeholder={placeholder}
        inputProps={inputProps}
        InputProps={{
          endAdornment: endAdornment,
          startAdornment: startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : (
            ''
          ),
          disableUnderline: disableUnderline,
          classes: inputclasses,
          readOnly: disableUnderline,
          ...customInputProps
        }}
        autoComplete="off"
        InputLabelProps={InputLabelProps}
        {...(error && {
          error: true,
          helperText: <div style={{ fontSize: '12px' }}>{error}</div>
        })}
      />
    </>
  );
}
