import styled from "styled-components";

const BtnPagination = styled.div`
  background-color: #ffffff;
  cursor: pointer;
`;
function Pagination({ filter, handleNext, handlePrevious }) {
  return (
    <div className="d-flex justify-content-between">
      {filter.offset > 0 && (
        <BtnPagination onClick={handlePrevious}>{"<<"}</BtnPagination>
      )}
      <BtnPagination onClick={handleNext}>{">>"}</BtnPagination>
    </div>
  );
}
export default Pagination;
