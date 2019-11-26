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
  }
`;

export const FormContainer = styled.div`
    margin-top: 20px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 4px;
  padding: 20px 10px;
`;