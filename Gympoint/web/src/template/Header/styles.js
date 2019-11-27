import styled from 'styled-components';
import { darken } from 'polished';

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
        a {
          font-size: 15px;
          font-weight: bold;
          color: #999999;
          padding: 10px;
          text-decoration: none;
          transition: 0.2s;

          &:hover {
            color: ${darken(0.2, '#999999')}
          }

        }

        a.active {
          color:#444444;
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
