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
    <div>
      <button onClick={handleClickPrev}>prev</button>
      {currentPage} of {totalPages}
      <button onClick={handleClickNext}>next</button>
    </div>
  );
};

export default Paginator;
