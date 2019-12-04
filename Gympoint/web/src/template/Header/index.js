import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Content } from './styles';
import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-horizontal.svg';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }
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
              <NavLink to="/plans">Plans</NavLink>
            </li>
            <li>
              <NavLink to="/enrollments">Enrollments</NavLink>
            </li>
            <li>
              <Link to="/help">Help Orders</Link>
            </li>
          </ul>
        </nav>

        <aside>
          <span>Henrique Campaner</span>
          <button type="submit" onClick={handleSignOut}>
            Log Out
          </button>
        </aside>
      </Content>
    </Container>
  );
}
