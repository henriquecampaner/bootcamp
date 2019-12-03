import styled from 'styled-components';

export const PlansList = styled.main`
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
      font-size: 16px;
      text-align: center;
    }

    thead th:first-child {
      text-align: left;
    }

    td:last-child {
      text-align: center;
      width: 10%;
    }

    td {
      text-align: center;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }

    td:first-child {
      text-align: left;
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
