import styled from 'styled-components';

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
      border-radius: 4px;

      &::placeholder {
        padding-left: 10px;
      }
    }

    input[value] {
      padding-left: 10px;
      font-size: 16px;
      border-radius: 4px;
    }

    span {
      font-weight: bold;
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

        &.grey input {
          background: #eee;
        }
      }
    }
  }
`;
