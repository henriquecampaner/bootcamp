import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  border: 1px solid red;
  margin: 20px auto;
  width: 900px;
`;

export const ContentHead = styled.div`
  border: 1px solid red;
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

export const StudentsList = styled.main``;
