import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface SelectFieldProps {
  items: string[];
  selectedItem: string;
  handleSelectChange: (event: SelectChangeEvent<string>) => void;
}
const SelectField = ({
  items,
  selectedItem,
  handleSelectChange,
}: SelectFieldProps) => {
  return (
    <Select
      style={{ width: "17em" }}
      sx={{
        // paddingX: 0,
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
        backgroundColor: selectedItem.length ? "white" : "lightgrey",
        "&:hover": {
          border: "0.1em solid #032845",
          backgroundColor: "white",
        },
      }}
      value={selectedItem}
      onChange={handleSelectChange}
    >
      <MenuItem sx={{ padding: "0.5em" }} value=''>n/a</MenuItem>
      {items.map((name, index) => (
        <MenuItem sx={{ padding: "0.5em" }} key={index} value={name}>
          {name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectField;
