import React, { ChangeEvent, useRef, useState } from "react";
import {
  EditToolsBar,
  FieldTitle,
  FieldValue,
  ValueWithEditToolBar,
  Wrapper,
} from "./editable-field.styles";
import SvgIcon, {
  Fashion,
  SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";
import SelectField from "../select-field/select-field.component";
import { SelectChangeEvent } from "@mui/material";

interface EditableFieldProps {
  title: string;
  valueFromStore: string;
  isSelectable?: boolean;
  itemsForSelect?: string[];
  handleSaveChanges: (value: string)=>void
}
const EditableField = ({
  title,
  valueFromStore,
  isSelectable,
  itemsForSelect = [],
  handleSaveChanges,
}: EditableFieldProps) => {
  const [value, setValue] = useState(valueFromStore);
  const canSave = value !== valueFromStore;
  const [isReadOnly, setIsReadOnly] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const handleEditClicked = () => {
    setIsReadOnly((prev) => !prev);
    if (isReadOnly && inputRef.current) {
      //Focus input when switching to editable mode. ReadOnly has a previous state before clicking edit icon
      inputRef.current.focus();
    }
  };
  const handleSaveClicked = () => {
    setIsReadOnly((prev) => !prev);
    handleSaveChanges(value);
  };
  const handleCancelClicked = () => {
    setValue(valueFromStore);
    setIsReadOnly((prev) => !prev);
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
            readOnly={isReadOnly}
            onChange={handleInputChange}
          />
        ) : isReadOnly ? (
          <FieldValue
            ref={inputRef}
            value={value}
            readOnly={isReadOnly}
            onChange={handleInputChange}
          />
        ) : (
          <SelectField
            items={itemsForSelect}
            selectedItem={value}
            handleSelectChange={handleSelectChange}
          />
        )}

        <EditToolsBar>
          {isReadOnly ? (
            <SvgIcon
              svgPath={SVG_PATH.PENCIL}
              fashion={Fashion.ANIMATED}
              size="1em"
              fill="black"
              onClick={handleEditClicked}
            />
          ) : (
            <>
              <SvgIcon
                svgPath={SVG_PATH.SAVE}
                fashion={Fashion.ANIMATED}
                size="1em"
                fill={canSave ? "black" : "#3b3a3a"}
                onClick={handleSaveClicked}
                pointerEvents={canSave ? "auto" : "none"}
              />
              <SvgIcon
                svgPath={SVG_PATH.CANCEL}
                fashion={Fashion.ANIMATED}
                size="1.1em"
                fill="black"
                onClick={handleCancelClicked}
              />
            </>
          )}
        </EditToolsBar>
      </ValueWithEditToolBar>
    </Wrapper>
  );
};

export default EditableField;
