import { FC } from "react";
import PropTypes from "prop-types";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { Typography, Grid, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BsCloudUpload } from "react-icons/bs";

interface PageTitleProps {
  heading?: string;
  subHeading?: string;
  docs?: string;
  name?: string;
  nameBtnTwo?: string;
  onclickButton?: Function;
  onclickButtonTwo?: Function;
  onChangeImport?: Function;
  isButton?: boolean;
  isButtonTwo?: boolean;
  importCSV?: boolean;
  children?: any;
  isBack?: boolean;
}

const PageTitle: FC<PageTitleProps> = ({
  heading = "",
  subHeading = "",
  docs = "",
  name = "",
  nameBtnTwo = "",
  onclickButton = () => {},
  onChangeImport = () => {},
  onclickButtonTwo = () => {},
  isButton = true,
  isButtonTwo = false,
  importCSV = false,
  children,
  isBack = false,
  ...rest
}) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      style={{ marginTop: "-10px" }}
      {...rest}
    >
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {heading}
        </Typography>

        <Typography variant="subtitle2">{subHeading}</Typography>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ width: "40%" }}
        {...rest}
      >
        <Grid item>
          {importCSV && (
            <Button
              onClick={(e) => onChangeImport(e)}
              variant="contained"
              component="label"
              startIcon={
                <BsCloudUpload
                  style={{
                    fontWeight: "600",
                  }}
                  size={18}
                />
              }
            >
              Import
            </Button>
          )}
        </Grid>
        <Grid item>
          {isButtonTwo && (
            <Button
              href={docs}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: { xs: 2, md: 0 }, textDecorationLine: "none" }}
              variant="contained"
              startIcon={
                isBack ? (
                  <ArrowBackIcon fontSize="small" />
                ) : (
                  <AddTwoToneIcon fontSize="small" />
                )
              }
              onClick={() => onclickButtonTwo()}
            >
              {nameBtnTwo}
            </Button>
          )}
        </Grid>
        <Grid item>
          {isButton ? (
            <Button
              href={docs}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: { xs: 2, md: 0 }, textDecorationLine: "none" }}
              variant="contained"
              startIcon={
                isBack ? (
                  <ArrowBackIcon fontSize="small" />
                ) : (
                  <AddTwoToneIcon fontSize="small" />
                )
              }
              onClick={() => onclickButton()}
            >
              {name}
            </Button>
          ) : (
            <div>{children}</div>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

PageTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  docs: PropTypes.string,
};

export default PageTitle;