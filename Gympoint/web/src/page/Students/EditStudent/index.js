import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdPersonAdd } from 'react-icons/md';
import api from '~/services/api';

import {
  Container,
  ContentHead,
  FormContainer
} from './styles';

export default function Students() {

  return (
    <Container>
      <ContentHead>
        <h2>Edit Student</h2>

        <aside>
          <Link to="/">
            <MdPersonAdd size={20} color="#fff" />
            <span>CADASTRAR</span>
          </Link>
          <Link to="/">
            <MdPersonAdd size={20} color="#fff" />
            <span>CADASTRAR</span>
          </Link>
        </aside>
      </ContentHead>

      <FormContainer>
        <span>Your Name</span>
        <input />
      </FormContainer>
      
    </Container>
  );
}
