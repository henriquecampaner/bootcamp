import React from 'react';
import { Container, Content } from './styles';

import logo from '~/assets/logo-horizontal.svg';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <ul>
            <li>Students</li>
            <li>Plans</li>
            <li>Enrollments</li>
            <li>Help Orders</li>
          </ul>
        </nav>

        <aside>
          <span>Henrique Campaner</span>
          <button type="submit">Log Out</button>
        </aside>
      </Content>
    </Container>
  );
}
