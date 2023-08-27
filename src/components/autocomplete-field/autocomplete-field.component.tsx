import { Autocomplete, Chip, TextField } from "@mui/material";
import { SyntheticEvent } from "react";
import { Title } from "../../App.style";
import { AutocompleteFieldWrapper } from "./authocomplete-field.style";

interface AutocompleteFieldProps {
  fieldName: string;
  items: string[];
  selectedItems: string[];
  handleChange: (
    event: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) => void;
}

const AutocompleteField = ({
  fieldName,
  items,
  selectedItems,
  handleChange,
}: AutocompleteFieldProps) => {
  return (
    <AutocompleteFieldWrapper>
      <Title style={{ color: "white" }}>{fieldName}:</Title>
      <Autocomplete
        onChange={handleChange}
        multiple
        options={items}
        value={selectedItems}
        filterSelectedOptions
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => (
            <Chip {...getTagProps({ index })} color="info" label={option} />
          ));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            placeholder="set your interests"
          />
        )}
        sx={{
          p: ".1em",
          "& .MuiChip-label": {
            color: "white",
          },
          "& .MuiChip-deleteIcon": {
            fill: "#011d42",
          },
          "& fieldset": {
            border: "none",
          },
          fontSize: "1em",
          fontWeight: 400,
          fontFamily: "Ubuntu",
          width: "30em",
          height: "fit-content",
          borderRadius: "0.3em",
          border: "0.05em solid white",
          outline: "none",
          backgroundColor: selectedItems?.length ? "white" : "lightgrey",
          "&:hover": {
            border: "0.1em solid #032845",
            backgroundColor: "white",
            p: ".05em",
          },
        }}
      />
    </AutocompleteFieldWrapper>
  );
};

export default AutocompleteField;
