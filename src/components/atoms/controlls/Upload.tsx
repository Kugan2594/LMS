import React from 'react';
import { Grid, Paper, TextField, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/system';

const Item = styled(Paper)(({ theme }: any) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));
export default function Upload(props) {
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
    imageTitle,
    handleClear
  } = props;
  return (
    <div>
      <TextField
        id={id}
        inputRef={textFieldRef}
        sx={{ width: width }}
        variant="outlined"
        label={label}
        name={name}
        size="medium"
        value={value}
        onChange={onChange}
        type={type}
        onSelect={onSelect}
        // fullWidth
        placeholder={placeholder}
        InputProps={{
          endAdornment: endAdornment
        }}
        autoComplete="off"
        InputLabelProps={InputLabelProps}
        {...(error && { error: true, helperText: error })}
      >
        upload
      </TextField>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Item>{imageTitle}</Item>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={1}>
          <Typography>
            <div onClick={handleClear}>
              <Close />
            </div>
          </Typography>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}
