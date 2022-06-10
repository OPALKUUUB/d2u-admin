import styled from "styled-components";

export const Layout = styled.div`
  margin: 30px;
`;

export const Card = styled.div`
  padding: 20px;
  background-color: #ffffff;
`;

export const TableStyles = styled.div`
  max-height: 75vh;
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
