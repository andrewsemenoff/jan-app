import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import EditToolsBar from "../edit-toolsbar/edit-toolsbar.component";
import SelectField from "../select-field/select-field.component";
import {
  FieldTitle,
  FieldValue,
  ValueWithEditToolBar,
  Wrapper,
} from "./editable-field.styles";

let rendering = 0;

interface EditableFieldProps {
  title: string;
  valueFromStore: string;
  isSelectable?: boolean;
  itemsForSelect?: string[];
  handleSaveChanges: (value: string) => void;
}
const EditableField = ({
  title,
  valueFromStore,
  isSelectable,
  itemsForSelect = [],
  handleSaveChanges,
}: EditableFieldProps) => {
  const [value, setValue] = useState(valueFromStore);

  useEffect(() => {
    setValue(valueFromStore);
  }, [valueFromStore]);

  if (title === "display name") {
    console.log(
      "Editable rendering ",
      rendering,
      " valueFromStore: ",
      valueFromStore
    );
    console.log("Editable rendering ", rendering++, " value: ", value);
  }

  const canSave = value !== valueFromStore;
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const handleEditModeClicked = () => {
    setIsEditModeOn((prev) => !prev);
    if (!isEditModeOn && inputRef.current) {
      //Focus input when switching to editable mode. ReadOnly has a previous state before clicking edit icon
      inputRef.current.focus();
    }
  };
  const handleSaveClicked = () => {
    setIsEditModeOn((prev) => !prev);
    handleSaveChanges(value);
  };
  const handleCancelClicked = () => {
    setValue(valueFromStore);
    setIsEditModeOn((prev) => !prev);
  };
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setValue(e.target.value);
  };

  return (
    <Wrapper>
      <FieldTitle>{title}</FieldTitle>
      <ValueWithEditToolBar>
        {!isSelectable ? (
          <FieldValue
            ref={inputRef}
            value={value}
            readOnly={!isEditModeOn}
            onChange={handleInputChange}
          />
        ) : !isEditModeOn ? (
          <FieldValue
            ref={inputRef}
            value={value}
            readOnly={!isEditModeOn}
            onChange={handleInputChange}
          />
        ) : (
          <SelectField
            items={itemsForSelect}
            selectedItem={value}
            handleSelectChange={handleSelectChange}
          />
        )}
        <EditToolsBar
          canSave={canSave}
          isEditModeActive={isEditModeOn}
          handleEditModeClicked={handleEditModeClicked}
          handleCancelClicked={handleCancelClicked}
          handleSaveClicked={handleSaveClicked}
        />
      </ValueWithEditToolBar>
    </Wrapper>
  );
};

export default EditableField;
