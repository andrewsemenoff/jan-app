import { SyntheticEvent, useState } from "react";
import AutocompleteField from "../autocomplete-field/autocomplete-field.component";
import EditToolsBar from "../edit-toolsbar/edit-toolsbar.component";
import { Wrapper } from "./chips-editable-field.styles";

interface ChipsEditableFieldProps {
  defaultItems: string[];
  initialChips: string[];
  handleSaveChanges: (chips: string[]) => void;
}
function ChipsEditableField({
  defaultItems,
  initialChips,
  handleSaveChanges,
}: ChipsEditableFieldProps) {
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [chips, setChips] = useState(initialChips);
  const canSave = chips !== initialChips;

  const handleEditModeClicked = () => {
    setIsEditModeOn((prev) => !prev);
  };
  const handleSaveClicked = () => {
    setIsEditModeOn((prev) => !prev);
    handleSaveChanges(chips);
  };
  const handleCancelClicked = () => {
    setChips(initialChips);
    setIsEditModeOn((prev) => !prev);
  };
  const handleChipsChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) => {
    setChips(newValue);
  };

  return (
    <Wrapper>
      <div style={{width: '80%'}}>
        <AutocompleteField
          readonly={!isEditModeOn}
          selectedItems={chips}
          items={defaultItems}
          handleChange={handleChipsChange}
        />
      </div>
      <EditToolsBar
        canSave={canSave}
        isEditModeActive={isEditModeOn}
        handleEditModeClicked={handleEditModeClicked}
        handleSaveClicked={handleSaveClicked}
        handleCancelClicked={handleCancelClicked}
      />
    </Wrapper>
  );
}
export default ChipsEditableField;
