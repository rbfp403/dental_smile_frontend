import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  ClickAwayListener,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { ViewCita } from "./";

//
//
//

const StyledTooltip = styled((props) => (
  <Tooltip classes={{ popper: props.className }} {...props} />
))`
  & .MuiTooltip-tooltipArrow {
    background-color: transparent;
    margin:0px;
    padding:0px;
    max-width: none;

  }

  & .MuiTooltip-arrow {
    ::before {
      background-color:  black;
    
    },
   
  }
`;

//
//
//
//
export const CalendarEvent = ({ event }) => {
  //

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(!open);
  };

  const { paciente, motivo } = event;

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <StyledTooltip
          title={<ViewCita closeCitaView={handleTooltipClose} />}
          arrow
          placement="top"
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          TransitionComponent={Zoom}
        >
          <Box
            component="div"
            onClick={handleTooltipOpen}
            sx={{
              borderRadius: "5px",
            }}
          >
            <Typography
              sx={{
                ":hover": {
                  color: "#01EBED",
                  cursor: "pointer",
                },
              }}
              fontSize="14px"
              fontStyle="italic"
              color="white"
              fontWeight="bold"
            >
              {motivo}
            </Typography>

            <Typography
              fontSize="13px"
              fontStyle="italic"
              color="black"
              fontWeight="bold"
            >
              {paciente}
            </Typography>
          </Box>
        </StyledTooltip>
      </div>
    </ClickAwayListener>
  );
};
