import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import api from '~/services/api';
import history from '~/services/history';
import Container from '~/template/Container/index';
import StudentHeader from '~/template/ContentHead/index';
import CurrencyInput from '~/template/CurrencyInput';

import { FormContainer } from './styles';

const schema = Yup.object().shape({
  title: Yup.string(),
  duration: Yup.number(),
  price: Yup.number(),
});

export default function Students() {
  const { id } = useParams();
  const { plan } = useSelector(state => state.plan);
  const [initialData, setInitialData] = useState();
  const [newPrice, setNewPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState();
  const [newDuration, setNewDuration] = useState();
  useMemo(() => {
    function loadPlan() {
      if (plan) {
        setInitialData({
          ...plan,
          total: plan.price * plan.duration,
        });
        setNewDuration(plan.duration);
        setNewPrice(plan.price);
      } else {
        history.push('/plans');
      }
    }

    loadPlan();
  }, [plan]);

  useEffect(() => {
    setTotalPrice(newPrice * newDuration);
  }, [newPrice, newDuration]);

  async function handleSubmit({ title, price, duration }) {
    try {
      await api.put(`/plans/${id}`, {
        title,
        price,
        duration,
      });
      toast.success('Plan updated successfully');
      history.push('/plans');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  function handleOnChange(value) {
    setNewPrice(value);
  }

  return (
    <Container>
      <>
        <StudentHeader title="Edit Plan" Default form="editPlan" to="/plans" />

        <FormContainer>
          <Form
            initialData={initialData}
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
                <Input
                  name="duration"
                  placeholder="Plan Duration"
                  onChange={e => setNewDuration(e.target.value)}
                  type="number"
                />
              </div>
              <div className="columwidth">
                <span>Price per month</span>
                <CurrencyInput
                  name="price"
                  placeholder="Plan Price"
                  setChange={setNewPrice}
                  onChange={handleOnChange}
                />
              </div>
              <div className="columwidth grey">
                <span>Total</span>
                <CurrencyInput
                  name="total"
                  placeholder="Plan Total"
                  readOnly
                  getChange={totalPrice}
                />
              </div>
            </div>
          </Form>
        </FormContainer>
      </>
    </Container>
  );
}
