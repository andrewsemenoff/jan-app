import SvgIcon, {
  Fashion,
  SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";
import { Wrapper } from "./edit-toolsbar.styles";

interface EditToolsBarProps {
  canSave?: boolean;
  isEditModeActive?: boolean;
  handleEditModeClicked?: () => void;
  handleSaveClicked?: () => void;
  handleCancelClicked?: () => void;
}

const EditToolsBar = ({
  canSave,
  isEditModeActive,
  handleEditModeClicked,
  handleSaveClicked,
  handleCancelClicked,
}: EditToolsBarProps) => {
  return (
    <Wrapper>
      {!isEditModeActive ? (
        <SvgIcon
          svgPath={SVG_PATH.PENCIL}
          fashion={Fashion.ANIMATED}
          size="1em"
          fill="black"
          onClick={handleEditModeClicked}
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
    </Wrapper>
  );
};

export default EditToolsBar;
