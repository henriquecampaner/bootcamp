import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 24px;
  }

  aside {
    display: flex;
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

export const AddButton = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #ee4d64;
  color: #fff;
  border-radius: 4px;
  margin-right: 20px;
  border: none;
  font-weight: bold;

  &:hover {
    background: ${darken(0.1, '#ee4d64')};
  }

  svg {
    margin-right: 10px;
  }
`;

export const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #cccccc;
  color: #fff;
  border-radius: 4px;
  margin-right: 20px;
  border: none;
  font-weight: bold;

  &:hover {
    background: ${darken(0.1, '#cccccc')};
  }
  svg {
    margin-right: 10px;
  }
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #ee4d64;
  color: #fff;
  border-radius: 4px;
  border: none;
  font-weight: bold;

  &:hover {
    background: ${darken(0.1, '#ee4d64')};
  }
`;
