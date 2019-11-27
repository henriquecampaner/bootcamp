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
              <Link>
                Plans
              </Link>
            </li>
            <li>
              <Link>
                Enrollments
              </Link>
            </li>
            <li>
              <Link>
                Help Orders
              </Link>
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
