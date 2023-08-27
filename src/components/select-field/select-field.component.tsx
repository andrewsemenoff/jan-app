import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Title } from "../../App.style";
import { SelectFieldWrapper } from "./select-field.style";

interface SelectFieldProps {
  fieldName: string;
  items: string[];
  selectedItems: string[];
  handleSelectChange: (event: SelectChangeEvent<string[] | string>) => void;
}
const SelectField = ({
  fieldName,
  items,
  selectedItems,
  handleSelectChange,
}: SelectFieldProps) => {
  return (
    <SelectFieldWrapper>
      <Title style={{ color: "white" }}>{fieldName}:</Title>
      <Select
        sx={{
            paddingX: 0,
          "& fieldset": {
            border: "none",
          },
          fontSize: "1em",
          fontWeight: 400,
          fontFamily: "Ubuntu",
          width: "16em",
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
        // MenuProps={MenuProps}
      >
        {items.map((name, index) => (
          <MenuItem sx={{ padding: "0" }} key={index} value={name}>
            <Checkbox checked={selectedItems.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </SelectFieldWrapper>
  );
};

export default SelectField;
