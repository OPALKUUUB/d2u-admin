import styled from "styled-components";

export const Layout = styled.div`
  margin: 30px;
  margin-bottom: 0;
`;

export const Card = styled.div`
  padding: 20px;
  background-color: #ffffff;
`;

export const TableStyles = styled.div`
  max-height: 70vh;
  overflow: scroll;

  table {
    border-spacing: 0;
    width: 100%;
  }
  th,
  td {
    padding: 10px 15px;
  }
  td {
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: white;
    position: sticky;
    z-index: 2;
    top: 0;
    border-bottom: 2px solid rgba(0, 0, 0, 0.6);
  }
  tr th:last-child {
    padding: 0;
  }
  tr td:last-child {
    padding: 0;
    width: fit-content;
  }
  tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const FormAddMartStyles = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export const FrameImage = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  overflow: hidden;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    z-index: 1;
  }
`;
