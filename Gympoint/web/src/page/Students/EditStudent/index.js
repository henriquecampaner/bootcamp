import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import Container from '~/template/Container/index';
import StudentHeader from '~/template/ContentHead/index';

import { FormContainer } from './styles';

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
    try {
      await api.put(`/students/${id}`, data);
      toast.success('Student updated successfully');
      history.push('/students');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  return (
    <Container>
      <>
        <StudentHeader
          title="Edit Student"
          Default
          form="editStudent"
          to="/students"
        />

        <FormContainer>
          <Form
            initialData={student}
            id="editStudent"
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
      </>
    </Container>
  );
}
