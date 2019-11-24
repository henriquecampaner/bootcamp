import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 30px;
  background: #fff;
  box-shadow: 0px 1px 1px 0px rgba(153, 153, 153, 1);
`;

export const Content = styled.div`
  height: 64px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    img {
      width: 150px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #e3e3e3;
    }

    ul {
      display: flex;
      align-items: center;
      flex-direction: row;

      li {
        font-size: 15px;
        color: #999999;

        padding: 10px;

        &:active {
          color: #444444;
        }
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;

    span {
      font-size: 14px;
    }

    button {
      background: none;
      border: none;
      color: #de3b3b;
    }
  }
`;
