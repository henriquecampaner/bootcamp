import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import api from '~/services/api';
import history from '~/services/history';
import Container from '~/template/Container/index';
import StudentHeader from '~/template/ContentHead/index';
import SelectStudent from '~/template/SelectStudent';

import { FormContainer } from './styles';

export default function Students() {
  const schema = Yup.object().shape({
    title: Yup.string(),
    duration: Yup.number(),
    price: Yup.number(),
  });

  const [enrollment, setEnrollment] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [plan, setPlan] = useState({});
  const { id } = useParams();

  const flavourOptions = [
    { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
    { value: 'chocolate', label: 'Chocolate', rating: 'good' },
    { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
    { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
  ];

  useEffect(() => {
    async function loadPlan() {
      const { data } = await api.get(`/enrollment/${id}`);
      setEnrollment(data);
      setPlan([{ value: data.plan.title, label: data.plan.title }]);
    }

    loadPlan();
  }, [id]);

  function handleChange(date) {
    setStartDate(date);
  }

  async function handleSubmit(data) {
    // try {
    //   await api.put(`/plans/${id}`, data);
    //   toast.success('Plan updated successfully');
    //   history.push('/plans');
    // } catch (error) {
    //   toast.error('Something went wrong');
    // }
  }

  console.log(plan);

  return (
    <Container>
      <>
        <StudentHeader
          title="Edit Enrollment"
          Default
          form="editEnrollment"
          to="/enrollments"
        />

        <FormContainer>
          <Form
            initialData={enrollment}
            id="editEnrollment"
            schema={schema}
            onSubmit={handleSubmit}
          >
            <div className="fullwidth">
              <SelectStudent name="name" label="STUDENT" />
            </div>
            <div className="colum">
              <div className="columwidth">
                <span>Plan</span>
                <Select options={plan} defaultValue={plan[1]} value={plan} />
              </div>
              <div className="columwidth">
                <span>Date of Start</span>
                <DatePicker selected={startDate} onChange={handleChange} />
              </div>
              <div className="columwidth">
                <span>Date of ending</span>
                <Input name="enrollment.end_date" placeholder="Plan Price" />
              </div>
              <div className="columwidth">
                <span>Total Price</span>
                <Input name="enrollment.price" placeholder="Plan Price" />
              </div>
            </div>
          </Form>
        </FormContainer>
      </>
    </Container>
  );
}
