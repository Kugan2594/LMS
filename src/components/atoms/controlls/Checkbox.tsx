import React from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Checkbox as MuiCheckbox,
  Tooltip,
} from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export default function Checkbox(props: any) {
  const { name, label, value, onChange, disabled, style, helperText } = props;

  const convertToDefEventPara = (name: any, value: any) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <>
      {helperText && helperText.length > 0 ? (
        <Grid container>
          <Grid item xs={10}>
            {" "}
            <FormControl>
              <FormControlLabel
                style={{ ...style }}
                control={
                  <MuiCheckbox
                    disabled={disabled}
                    name={name}
                    color="primary"
                    checked={value}
                    onChange={(e) =>
                      onChange &&
                      onChange(convertToDefEventPara(name, e.target.checked))
                    }
                  />
                }
                label={label}
              />
            </FormControl>
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
        <FormControl>
          <FormControlLabel
            style={{ ...style }}
            control={
              <MuiCheckbox
                disabled={disabled}
                name={name}
                color="primary"
                checked={value}
                onChange={(e) =>
                  onChange &&
                  onChange(convertToDefEventPara(name, e.target.checked))
                }
              />
            }
            label={label}
          />
        </FormControl>
      )}
    </>
  );
}
