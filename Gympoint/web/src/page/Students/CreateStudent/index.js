import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '~/services/api';
import history from '~/services/history';
import Container from '../../../template/Students/StudentContainer/index'
import StudentHeader from '../../../template/Students/StudentHeader/index'

import {  FormContainer } from './styles';

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
      <StudentHeader title="Create New Student" Default/>

      <FormContainer>
        <Form
          initialData={student}
          id="form"
          schema={schema}
          onSubmit={handleSubmit}
        >
          <div className="fullwidth">
            <span>Student Name</span>
            <Input name="name" placeholder="Ex: Henrique Campaner"/>
          </div>
          <div className="fullwidth">
            <span>E-mail</span>
            <Input name="email" type="email" placeholder="Ex: email@email.com" />
          </div>
          <div className="colum">
            <div className="columwidth">
              <span>Age</span>
              <Input name="age" placeholder="Ex: 21" />
            </div>
            <div className="columwidth">
              <span>Weight</span>
              <Input name="weight" placeholder="Ex: 79" />
            </div>
            <div className="columwidth">
              <span>Height</span>
              <Input name="height" placeholder="Ex: 1.78" />
            </div>
          </div>
        </Form>
      </FormContainer>
    </Container>
  );
}
