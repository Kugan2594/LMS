import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import moment from "moment";

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: ${theme.footer.background};
        box-shadow: ${theme.footer.boxShadow};
        text-align: center;
        height: ${theme.footer.height};
        color: ${theme.footer.textColor};
        @media (min-width: ${theme.breakpoints.values.lg}px) {
          left: 5%;
          
      }
`
);

function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <Box>
          <Typography variant="subtitle1">
            Leave Management &copy; {moment().format("YYYY")}
          </Typography>
        </Box>
      </Container>
    </FooterWrapper>
  );
}

export default Footer;
