import { Box } from "@mui/system";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { MdPersonRemove } from "react-icons/md";

import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Grid,
  Stack,
} from "@mui/material";

interface Props {
  deleteOnclick?: Function;
  onRemove?: Function;
  editOnclick?: Function;
  rowData?: object;
  deleteFeature?: boolean;
  editFeature?: boolean;
  removeFeature?: boolean;
  privateHire?: boolean;
}

export const TableAction = (props: Props) => {
  const {
    deleteOnclick = () => {},
    editOnclick = () => {},
    onRemove = () => {},
    rowData,
    deleteFeature = true,
    editFeature = true,
    removeFeature = false,
    privateHire = false,
  } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
    if (removeFeature) {
      onRemove(rowData);
    } else {
      deleteOnclick(rowData);
    }

    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        bgcolor: "background.paper",
        justifyContent: "space-around",
      }}
    >
      <Dialog
        style={{ padding: "10px 24px" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText>
            {privateHire
              ? `This driver has private hire, Are you sure you want to ${
                  removeFeature ? "Remove" : "Delete"
                } this? `
              : ` Are you sure you want to ${
                  removeFeature ? "Remove" : "Delete"
                } this?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOk} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {editFeature && (
        <>
          <div onClick={() => editOnclick(rowData)}>
            <EditOutlined
              sx={{ color: "blue", cursor: "pointer" }}
              fontSize="small"
            />
          </div>
        </>
      )}
      {deleteFeature && editFeature && (
        <Divider orientation="vertical" flexItem />
      )}
      {deleteFeature && (
        <div onClick={() => handleClickOpen()}>
          <DeleteOutlineIcon
            sx={{ color: "red", cursor: "pointer" }}
            fontSize="small"
          />
        </div>
      )}
      {removeFeature && <Divider orientation="vertical" flexItem />}
      {removeFeature && (
        <div onClick={() => handleClickOpen()}>
          <MdPersonRemove
            style={{
              color: "#4d5c57",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "900",
            }}
          />
        </div>
      )}
    </Box>
  );
};
