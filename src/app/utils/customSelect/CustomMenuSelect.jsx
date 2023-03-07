import { Button, MenuItem, Select } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/system";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CustomMenuSelect = ({
  menuItems,
  value,
  setValue,
  open,
  setOpen,
  chipLabel,
  showButton,
  buttonOnClick,
  buttonLabel,
  ButtonIcon,
  size = "small",
  getMenuItemLabel,
  nonObject = false,
}) => {
  return (
    <>
      {menuItems.length > 0 && (
        <Select
          required
          size={size}
          fullWidth
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          renderValue={() => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              <Chip label={chipLabel} />
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {menuItems.length > 0 &&
            menuItems.map((item, index) => (
              <MenuItem
                key={item._id || index}
                value={nonObject ? item : item._id}
              >
                {getMenuItemLabel(item)}
              </MenuItem>
            ))}
          {showButton && (
            <Button
              onClick={buttonOnClick}
              className="m-2"
              variant="outlined"
              size="small"
            >
              {ButtonIcon && <ButtonIcon className="mr-2" />}
              {buttonLabel}
            </Button>
          )}
        </Select>
      )}
    </>
  );
};

export default CustomMenuSelect;
