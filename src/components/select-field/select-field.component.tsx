import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface SelectFieldProps {
  items: string[];
  selectedItems: string[];
  handleSelectChange: (event: SelectChangeEvent<string[] | string>) => void;
}
const SelectField = ({
  items,
  selectedItems,
  handleSelectChange,
}: SelectFieldProps) => {
  return (
    <Select
      style={{ width: "17em" }}
      sx={{
        paddingX: 0,
        "& fieldset": {
          border: "none",
        },
        fontSize: "1em",
        fontWeight: 400,
        fontFamily: "Ubuntu",
        maxWidth: "100%",
        minWidth: "5em",
        height: "2em",
        borderRadius: "0.3em",
        border: "0.05em solid white",
        outline: "none",
        backgroundColor: selectedItems?.length ? "white" : "lightgrey",
        "&:hover": {
          border: "0.1em solid #032845",
          backgroundColor: "white",
        },
      }}
      multiple
      value={selectedItems}
      onChange={handleSelectChange}
      renderValue={(selected) => selected.join(", ")}
    >
      {items.map((name, index) => (
        <MenuItem sx={{ padding: "0" }} key={index} value={name}>
          <Checkbox checked={selectedItems.indexOf(name) > -1} />
          <ListItemText primary={name} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectField;
