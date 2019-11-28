import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
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

  const [plan, setPlan] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getPlan() {
      const { data } = await api.get(`/plans/3`);

      setPlan(data);
    }

    getPlan();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(data) {
    await api.put(`/plans/${id}`, data);

    history.push('/plans');
  }

  return (
    <Container>
      <>
        <StudentHeader title="Edit Plan" Default form="editPlan" to="/plans"/>

        <FormContainer>
          <Form
            initialData={plan}
            id="editPlan" 
            schema={schema}
            onSubmit={handleSubmit}
          >
            <div className="fullwidth">
              <span>Plan Title</span>
              <Input name="title" />
            </div>
            <div className="colum">
              <div className="columwidth">
                <span>Duration</span>
                <Input name="duration" placeholder="Plan Duration" />
              </div>
              <div className="columwidth">
                <span>Price per month</span>
                <Input name="price" placeholder="Plan Price" />
              </div>
              <div className="columwidth grey">
                <span>Total</span>
                <Input name="total" placeholder="Plan Total" readOnly/>
              </div>
            </div>
          </Form>
        </FormContainer>
      </>
    </Container>
  );
}
