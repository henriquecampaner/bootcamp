import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdPersonAdd } from 'react-icons/md';
import api from '~/services/api';

import { Container, ContentHead, StudentsList } from './styles';

export default function Students() {
  useEffect(() => {
    const response = api.get('students');

    console.tron.log(response.data);
  }, []);

  return (
    <Container>
      <ContentHead>
        <h2>Gerenciador De Alunos</h2>

        <aside>
          <Link to="/">
            <MdPersonAdd size={20} color="#fff" />
            <span>CADASTRAR</span>
          </Link>
          <input placeholder="Buscar aluno" />
        </aside>
      </ContentHead>
      <StudentsList>oi</StudentsList>
    </Container>
  );
}
