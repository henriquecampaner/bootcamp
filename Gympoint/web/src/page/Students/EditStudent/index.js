import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { MdPersonAdd } from 'react-icons/md';
import * as Yup from 'yup';
import api from '~/services/api';
import history from '~/services/history';

import { Container, ContentHead, FormContainer } from './styles';

export default function Students() {
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string(),
    age: Yup.number(),
    weight: Yup.number(),
    height: Yup.number(),
  });

  const [student, setStudent] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getStudent() {
      const { data } = await api.get(`students/${id}`);

      setStudent(data);
    }

    getStudent();
  }, [id]);

  async function handleSubmit(data) {
    await api.put(`/students/${id}`, data);

    history.push('/students');
  }

  return (
    <Container>
      <ContentHead>
        <h2>Edit Student</h2>

        <aside>
          <Link to="/">
            <MdPersonAdd size={20} color="#fff" />
            <span>BACK</span>
          </Link>
          <button type="submit" form="form">
            <MdPersonAdd size={20} color="#fff" />
            <span>SAVE</span>
          </button>
        </aside>
      </ContentHead>

      <FormContainer>
        <Form
          initialData={student}
          id="form"
          schema={schema}
          onSubmit={handleSubmit}
        >
          <div className="fullwidth">
            <span>Student Name</span>
            <Input name="name" />
          </div>
          <div className="fullwidth">
            <span>E-mail</span>
            <Input name="email" type="email" placeholder="Student email" />
          </div>
          <div className="colum">
            <div className="columwidth">
              <span>Age</span>
              <Input name="age" placeholder="Student age" />
            </div>
            <div className="columwidth">
              <span>Weight</span>
              <Input name="weight" placeholder="Student Weight" />
            </div>
            <div className="columwidth">
              <span>Height</span>
              <Input name="height" placeholder="Student height" />
            </div>
          </div>
        </Form>
      </FormContainer>
    </Container>
  );
}
