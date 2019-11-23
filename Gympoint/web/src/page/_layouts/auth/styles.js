import styled from 'styled-components';

import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: #fff;
  width: 100%;
  max-width: 450px;
  text-align: center;
  padding: 20px;
  border-radius: 6px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    span {
      color: #444444;
      align-self: flex-start;
      margin: 0 0 10px;
    }

    input {
      background: #fff;
      border: 1px solid #dddddd;
      border-radius: 4px;
      height: 55px;
      padding: 0 15px;
      color: #000;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.3);
      }
    }

    button {
      margin: 5px 0 0;
      height: 55px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#EE4D64')};
      }
    }
  }
`;
