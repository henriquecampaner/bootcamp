import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';
import history from '~/services/history';
import Container from '~/template/Container/index';
import StudentHeader from '~/template/ContentHead/index';
import { formatPrice } from '~/util/format';

import CurrencyInput from '~/template/CurrencyInput';

import { FormContainer } from './styles';

export default function Students() {
  const schema = Yup.object().shape({
    title: Yup.string().required(),
    duration: Yup.number().required(),
    price: Yup.number().required(),
  });

  const [total, setTotal] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDuration, setNewDuration] = useState('');

  useEffect(() => {
    if (newPrice && newDuration) {
      setTotal(formatPrice(newPrice * newDuration));
    } else {
      setTotal('');
    }
  }, [newPrice, newDuration]);

  async function handleSubmit({ title, duration, price }) {
    try {
      await api.post(`/plans`, { title, duration, price });
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
                  onChange={event => setNewDuration(event.target.value)}
                />
              </div>
              <div className="columwidth">
                <span>Price per month</span>
                <CurrencyInput
                  name="price"
                  placeholder="Plan Price"
                  setChange={setNewPrice}
                />
              </div>
              <div className="columwidth grey">
                <span>Total</span>
                <Input value={total} name="total" disabled />
              </div>
            </div>
          </Form>
        </FormContainer>
      </>
    </Container>
  );
}
