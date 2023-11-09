import { ToggleButton } from "@mui/material";
import PropTypes from "prop-types";

const NightModeToggle = ({ DarkModeSwitch, ChangeModeSwitch }) => {
  return (
    <ToggleButton
      value="light"
      checked={DarkModeSwitch}
      onChange={ChangeModeSwitch}
      color="primary"
      size="small"
    >
      🌞 Light & 🌙 Dark
    </ToggleButton>
  );
};

NightModeToggle.propTypes = {
  DarkModeSwitch: PropTypes.bool.isRequired,
  ChangeModeSwitch: PropTypes.func.isRequired,
};
export default NightModeToggle;
