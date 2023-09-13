import SvgIcon, { Fashion, SVG_PATH } from "../../svg-components/svg-icon/svg-icon.component";
import { PaginatorWrapper } from "./paginator.styles";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  handleClickPrev: () => void;
  handleClickNext: () => void;
}

const Paginator = ({
  currentPage,
  totalPages,
  handleClickPrev,
  handleClickNext,
}: PaginatorProps) => {
  return (
    <PaginatorWrapper>
      <SvgIcon onClick={handleClickPrev} svgPath={SVG_PATH.ARROW_BACK} fashion={Fashion.ANIMATED} fillOnHover="orange"/>
      {currentPage} of {totalPages}
      <SvgIcon onClick={handleClickNext} svgPath={SVG_PATH.ARROW_FORWARD} fashion={Fashion.ANIMATED}/>
    </PaginatorWrapper>
  );
};

export default Paginator;
