"use client";
import { Box, ToggleButton, ToggleButtonGroup, useColorScheme } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";

const modes = [
  { value: "light", icon: <LightModeOutlinedIcon />, label: "Light" },
  { value: "system", icon: <SettingsBrightnessOutlinedIcon />, label: "System" },
  { value: "dark", icon: <DarkModeOutlinedIcon />, label: "Dark" },
] as const;

export default function ModeSwitch() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mt: 1,
        p: 1,
      }}
    >
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(event, newMode) => setMode(newMode as typeof mode)}
        aria-label="Theme"
      >
        {modes.map((m) => (
          <ToggleButton
            key={m.value}
            value={m.value}
            aria-label={m.label}
            sx={{
              gap: "5px",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            {m.icon}
            {m.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
