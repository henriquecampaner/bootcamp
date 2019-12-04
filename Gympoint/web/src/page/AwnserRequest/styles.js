import styled from 'styled-components';
import { darken } from 'polished';

export const FormContainer = styled.div`
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
      color: #4d85ee;
    }
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  form {
    display: flex;
    flex-direction: column;

    strong {
      margin: 5px 0 12px 0;
    }

    p {
      font-size: 16px;
      line-height: 1.5em;
      margin-bottom: 20px;
      color: #666;
    }

    textarea {
      margin-bottom: 20px;
      padding: 8px 8px;
      height: 120px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 45px;
    border-radius: 4px;
    border: 0;
    font-weight: bold;
    background-color: #ee4d64;
    color: #fff;
    border: 1px solid #dddddd;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${darken(0.03, '#ee4d64')};
    }
  }
`;
