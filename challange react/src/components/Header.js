import React from 'react';

import './Header.css'
import logo from '../assets/facebook-logo.png';

function Header () {
  return(
    <header>
      <nav>
        <a href="#"><img src={logo} alt=""/></a>
        <a><p>Meu Perfil</p></a>
      </nav>
    </header>
  )
}

export default Header;