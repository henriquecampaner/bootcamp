import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 20px auto;
  width: 900px;
`;

export const ContentHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 24px;
    font-weight: normal;
  }

  aside {
    display: flex;
    a {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 10px;
      background: #ee4d64;
      color: #fff;
      border-radius: 4px;
      margin-right: 20px;

      &:hover {
        background: ${darken(0.1, '#ee4d64')};
      }

      svg {
        margin-right: 10px;
      }
    }

    input {
      background: #fff;
      border: 1px solid #dddddd;
      border-radius: 4px;
      height: 40px;
      padding: 0 15px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.3);
      }
    }
  }
`;

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
      color: #444444;
      text-align: left;
      font-size: 16px;
      font-weight: normal;
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
