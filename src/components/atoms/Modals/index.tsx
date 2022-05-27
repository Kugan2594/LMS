import PropTypes from "prop-types";
import { Card, CardHeader, CardContent, Divider } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

function Modals(props: any) {
  const { onClose, open, modalBody, modalTitle, modalWidth, modalHeigth } =
    props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            borderRadius: "5px",
            transform: "translate(-50%, -50%)",
            width: modalWidth ? modalWidth : "60%",
            height: modalHeigth ? modalHeigth : "auto",
            backgroundColor: "white",
            overflow: "auto",
          }}
        >
          <Card>
            {modalTitle !== null && (
              <CardHeader title={modalTitle} style={{ height: "50px" }} />
            )}
            <Divider style={{ marginTop: "-10px" }} />
            <CardContent
              style={{
                paddingBottom: "0px",
                maxHeight: "620px",
                // overflowY: "scroll",
              }}
            >
              {modalBody}
            </CardContent>
          </Card>
        </Box>
      </Fade>
    </Modal>
  );
}

Modals.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  modalTitle: PropTypes.string,
  modalBody: PropTypes.element.isRequired,
  modalWidth: PropTypes.string,
  modalHeigth: PropTypes.string,
};

export default Modals;
