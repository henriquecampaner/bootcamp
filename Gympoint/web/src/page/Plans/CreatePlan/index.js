import React, { useEffect, useState } from 'react';
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

  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [data, setData] = useState()

  async function handleSubmit() {
    setData(title, duration, price)

    await api.post(`/plans`, data);

    history.push('/plans');
  }

  return (
    <Container>
      <>
        <StudentHeader title="Create new Plan" Default form="createPlan" to="/plans"/>

        <FormContainer>
          <form
            id="createPlan" 
            schema={schema}
            onSubmit={handleSubmit}
          >
            <div className="fullwidth">
              <span>Plan Title</span>
              <input name="title" placeholder="Plan name" onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className="colum">
              <div className="columwidth">
                <span>Duration</span>
                <input name="duration" placeholder="Plan Duration" onChange={e => setDuration(e.target.value)}/>
              </div>
              <div className="columwidth">
                <span>Price per month</span>
                <input name="price" placeholder="Plan Price" onChange={e => setPrice(e.target.value)}/>
              </div>
              <div className="columwidth grey">
                <span>Total</span>
                <input name="total" placeholder="Plan Total" readOnly value={price * duration}/>
              </div>
            </div>
          </form>
        </FormContainer>
      </>
    </Container>
  );
}
