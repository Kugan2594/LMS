import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import PropTypes from "prop-types";
import { Divider, Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { find } from "lodash";
import { PureLightTheme } from "src/theme/schemes/PureLightTheme";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

const disabledStyle = {
  // cursor: 'not-allowed',
  border: "none",
  opacity: 0.6,
};

const defaultStyle = {
  // cursor: 'not-allowed'
};
export default function AutocompleteSelect(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options,
    onValueChange,
    defaultValue,
    clearable = true,
    disabled,
    onHover,
    tabIndex = 0,
    helperText = "",
  } = props;
  const onSelect = (e, va) => {
    // const { name, value } = e.target;
    // console.log('hit', va);

    let event = {
      target: {
        name: name,
        value: va === null ? "" : va.id,
      },
    };

    onChange && onChange(event);
    onValueChange && onValueChange(event);
  };
  const onClose = () => {
    // console.log('hit');
  };
  return (
    <div style={disabled ? disabledStyle : defaultStyle}>
      {helperText.length > 0 ? (
        <Grid container>
          <Grid item xs={10}>
            <Autocomplete
              id={name}
              fullWidth={true}
              onClose={onClose}
              disabled={disabled}
              options={options}
              tabIndex={tabIndex}
              disableClearable={clearable}
              defaultValue={defaultValue}
              getOptionLabel={(option: any) => option && option.title}
              getOptionDisabled={(options: any) =>
                options.optionDisabled ? options.optionDisabled : false
              }
              value={
                value === undefined
                  ? {}
                  : value
                  ? find(options, (post) => post.id === value)
                  : ""
              }
              onChange={onSelect}
              onMouseOver={onHover}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  variant="outlined"
                  {...(error && {
                    error: true,
                    helperText: error,
                  })}
                  sx={{ height: PureLightTheme.spacing(9) }}
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Tooltip enterDelay={500} leaveDelay={200} title={helperText}>
              <HelpOutlineOutlinedIcon
                style={{
                  marginTop: "17px",
                  color: "#00B761",
                }}
              />
            </Tooltip>
          </Grid>
        </Grid>
      ) : (
        <Autocomplete
          id={name}
          fullWidth={true}
          onClose={onClose}
          disabled={disabled}
          options={options}
          tabIndex={tabIndex}
          disableClearable={clearable}
          defaultValue={defaultValue}
          getOptionLabel={(option: any) => option && option.title}
          getOptionDisabled={(options: any) =>
            options.optionDisabled ? options.optionDisabled : false
          }
          value={
            value === undefined
              ? {}
              : value
              ? find(options, (post) => post.id === value)
              : ""
          }
          onChange={onSelect}
          onMouseOver={onHover}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              {...(error && {
                error: true,
                helperText: error,
              })}
              sx={{ height: PureLightTheme.spacing(9) }}
            />
          )}
        />
      )}
    </div>
  );
}
AutocompleteSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string || PropTypes.number,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onHover: PropTypes.func,
  options: PropTypes.array,
  onValueChange: PropTypes.func,
  defaultValue: PropTypes.object || PropTypes.string,
  clearable: PropTypes.bool,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  helperText: PropTypes.string,
};
