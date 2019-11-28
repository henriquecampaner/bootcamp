import React, { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';
import history from '~/services/history';
import Container from '~/template/Container/index';
import StudentHeader from '~/template/ContentHead/index';

import { FormContainer } from './styles';

export default function Students() {
  const schema = Yup.object().shape({
    title: Yup.string().required(),
    duration: Yup.number().required(),
    price: Yup.number().required(),
  });

  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  async function handleSubmit(data) {
    try {
      await api.post(`/plans`, data);
      toast.success('successfully created plan');
      history.push('/plans');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  return (
    <Container>
      <>
        <StudentHeader
          title="Create new Plan"
          Default
          form="createPlan"
          to="/plans"
        />

        <FormContainer>
          <Form id="createPlan" schema={schema} onSubmit={handleSubmit}>
            <div className="fullwidth">
              <span>Plan Title</span>
              <Input name="title" placeholder="Plan name" />
            </div>
            <div className="colum">
              <div className="columwidth">
                <span>Duration</span>
                <Input
                  name="duration"
                  placeholder="Plan Duration"
                  onChange={e => setDuration(e.target.value)}
                />
              </div>
              <div className="columwidth">
                <span>Price per month</span>
                <Input
                  name="price"
                  placeholder="Plan Price"
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
              <div className="columwidth grey">
                <span>Total</span>
                <input
                  name="total"
                  placeholder="Plan Total"
                  readOnly
                  value={price * duration}
                />
              </div>
            </div>
          </Form>
        </FormContainer>
      </>
    </Container>
  );
}
