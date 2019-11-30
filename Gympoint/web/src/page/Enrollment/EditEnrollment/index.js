import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { addMonths, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import api from '~/services/api';
import history from '~/services/history';
import Container from '~/template/Container/index';
import StudentHeader from '~/template/ContentHead/index';
import SelectStudent from '~/template/SelectStudent';
import { formatPrice } from '~/util/format';

import { FormContainer } from './styles';

import SelectPlan from '~/template/SelectPlan';

export default function EditEnrollment({ location }) {
  const schema = Yup.object().shape({
    title: Yup.string(),
    duration: Yup.number(),
    price: Yup.number(),
  });

  const { enrollment } = location.state;

  const { id } = useParams();

  const [plan, setPlan] = useState({
    value: enrollment.plan.id,
    label: enrollment.plan.title,
    duration: enrollment.plan.duration,
    price: enrollment.plan.price,
    total_price: enrollment.price,
  });
  const student = {
    value: enrollment.student.id,
    label: enrollment.student.name,
  };

  const [selectPlan, SetselectPlan] = useState({
    value: plan.value,
    label: enrollment.plan.title,
    duration: enrollment.plan.duration,
    price: enrollment.plan.price,
    total_price: enrollment.price,
  });

  const [startDate, setStartDate] = useState(new Date(enrollment.start_date));
  const [endDate, setEndDate] = useState(parseISO(enrollment.end_date));

  useEffect(() => {
    async function handleEndDate() {
      await setEndDate(addMonths(startDate, selectPlan.duration));
    }
    handleEndDate();
  }, [selectPlan, startDate]);

  function handleChange(selectedOption) {
    SetselectPlan(selectedOption);
  }

  async function handleSubmit() {
    const plan_id = selectPlan.value;
    const student_id = enrollment.student.id;
    const start_date = startDate;
    try {
      await api.put(`/enrollment/${id}`, { plan_id, student_id, start_date });
      toast.success('Plan updated successfully');
      history.push('/enrollments');
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
            initialData
            id="editEnrollment"
            schema={schema}
            onSubmit={handleSubmit}
          >
            <div className="fullwidth">
              <SelectStudent
                name="name"
                label="STUDENT"
                defaultName={student}
              />
            </div>

            <div className="colum">
              <div className="columwidth">
                <span>Plan</span>
                <SelectPlan
                  name="plan"
                  isSearchable
                  defaultValue={plan}
                  value={selectPlan}
                  onChange={handleChange}
                  selectPlan={selectPlan}
                  setPlan={setPlan}
                />
              </div>

              <div className="columwidth">
                <span>Date of Start</span>
                <DatePicker
                  name="start_date"
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="columwidth">
                <span>Date of ending</span>
                <DatePicker
                  readOnly
                  name="end_date"
                  selected={endDate}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="columwidth">
                <span>Total Price</span>
                <Input
                  name="price"
                  placeholder="Plan Price"
                  value={formatPrice(selectPlan.price * selectPlan.duration)}
                  readOnly
                />
              </div>
            </div>
          </Form>
        </FormContainer>
      </>
    </Container>
  );
}

EditEnrollment.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      enrollment: PropTypes.shape({
        id: PropTypes.number.isRequired,
        start_date: PropTypes.string.isRequired,
        end_date: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,

        student: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,

        plan: PropTypes.shape({
          price: PropTypes.number.isRequired,
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          duration: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
