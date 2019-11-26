import styled from 'styled-components';

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
      background: #cccccc;
      color: #fff;
      border-radius: 4px;
      margin-right: 20px;

      &:hover {
        opacity: 0.6;
      }
    }

    svg {
      margin-right: 10px;
    }
  }

  button {
    border: none;
    display: flex;
    align-items: center;
    height: 40px;
    padding: 10px;
    background: #ee4d64;
    color: #fff;
    border-radius: 4px;

    &:hover {
      opacity: 0.6;
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
  padding: 20px 20px;

  form {
    width: 100%;

    input {
      width: 100%;
      padding: 15px 2px;
      border: 1px solid #dddddd;
    }

    input[value] {
      padding-left: 10px;
      font-size: 16px;
    }

    span {
      color: #444444;
      align-self: flex-start;
      margin: 15px 0 5px 0;
      font-size: 15px;
      text-transform: uppercase;
    }

    .fullwidth {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .colum {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: flex-end;

      .columwidth {
        width: 32%;
        display: flex;
        flex-direction: column;
      }
    }
  }
`;
