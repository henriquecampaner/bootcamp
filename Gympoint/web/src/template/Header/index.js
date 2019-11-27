import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Content } from './styles';

import logo from '~/assets/logo-horizontal.svg';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <ul>
            <li>
              <NavLink to="/students">Students</NavLink>
            </li>
            <li>
              <Link to="/plans">Plans</Link>
            </li>
            <li>
              <Link to="/">Enrollments</Link>
            </li>
            <li>
              <Link to="/">Help Orders</Link>
            </li>
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
