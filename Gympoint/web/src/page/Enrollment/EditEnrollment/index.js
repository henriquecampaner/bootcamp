import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from '~/services/api';
import history from '~/services/history';
import Container from '~/template/Container/index';
import StudentHeader from '~/template/ContentHead/index';
import DatePicker from "react-datepicker";
import Select from 'react-select'


import { FormContainer } from './styles';

export default function Students() {
  const schema = Yup.object().shape({
    title: Yup.string(),
    duration: Yup.number(),
    price: Yup.number(),
  });

  const [plan, setPlan] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const { id } = useParams();

  useEffect(() => {
    async function loadPlan() {
      const { data } = await api.get(`/enrollment/${id}`);
      setPlan(data);
    }

    loadPlan();
  }, [id]);

  function handleChange(date) {
    setStartDate(date);
  }

  async function handleSubmit(data) {
    try {
      await api.put(`/plans/${id}`, data);
      toast.success('Plan updated successfully');
      history.push('/plans');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

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
            initialData={plan}
            id="editEnrollment"
            schema={schema}
            onSubmit={handleSubmit}
          >
            <div className="fullwidth">
              <span>Student</span>
              <Input name="student.name" />
            </div>
            <div className="colum">
              <div className="columwidth">
                <span>Plan</span>
                {/* <Input name="plan.title" placeholder="Plan Duration" /> */}
                <Select className="selectInput" placeholder="Selecione o plano"/>
              </div>
              <div className="columwidth">
                <span>Date of Start</span>
                <DatePicker selected={startDate} onChange={handleChange}/>
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
