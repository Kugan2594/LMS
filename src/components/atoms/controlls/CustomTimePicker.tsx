import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function CustomTimePicker(props) {
  const { name, label, value, onChange, error, disabled } = props;

  return (
    <>
      <TextField
        label={label}
        name={name}
        disabled={disabled}
        value={value === undefined ? '' : value}
        onChange={(date) => onChange && onChange(date)}
        type="time"
        InputLabelProps={{
          shrink: true

        }}
        
        inputProps={{
          step: 300 // 5 min
        }}
        sx={{ width: '100%' }}
        error={error}
        fullWidth
        {...(error && {
          error: true,
          helperText: error
        })}
      />
    </>
  );
}
