import styled from 'styled-components';

export const StudentsList = styled.main`
  margin-top: 20px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 4px;
  padding: 20px 10px;

  table {
    width: 100%;

    thead th {
      text-align: left;
      font-size: 16px;
    }

    thead th:first-child {
      padding-left: 10px;
    }

    td:last-child {
      width: 20%;
      text-align: right;
      padding-right: 10px;
    }

    td:first-child {
      padding-left: 10px;
    }

    tbody td {
      padding: 12px 12px 12px 0;
      border-bottom: 1px solid #eee;
    }

    button {
      background: none;
      border: none;
      padding: 5px;
    }
  }
`;

export const BtnEdit = styled.button`
  color: #4d85ee;
`;
export const BtnDelete = styled.button`
  color: #de3b3b;
`;
