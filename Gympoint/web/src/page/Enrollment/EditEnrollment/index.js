import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { addMonths, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import api from '~/services/api';
import history from '~/services/history';
import Container from '~/template/Container';
import StudentHeader from '~/template/ContentHead';
import SelectStudent from '~/template/SelectStudent';
import { FormContainer } from './styles';
import CurrencyInput from '~/template/CurrencyInput';
import SelectPlan from '~/template/SelectPlan';

const schema = Yup.object().shape({
  title: Yup.string(),
  duration: Yup.number(),
  price: Yup.number(),
});

export default function EditEnrollment() {
  const { enrollment } = useSelector(state => state.enrollment);

  const { id } = useParams();

  const [plan, setPlan] = useState();
  const [student, setStudent] = useState();
  const [selectPlan, SetselectPlan] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useMemo(() => {
    if (enrollment) {
      setPlan({
        value: enrollment.plan.id,
        label: enrollment.plan.title,
        duration: enrollment.plan.duration,
        price: enrollment.plan.price,
        total_price: enrollment.price,
      });

      setStudent({
        value: enrollment.student.id,
        label: enrollment.student.name,
      });

      SetselectPlan({
        value: enrollment.plan.id,
        label: enrollment.plan.title,
        duration: enrollment.plan.duration,
        price: enrollment.plan.price,
        total_price: enrollment.price,
      });

      setStartDate(new Date(enrollment.start_date));

      setEndDate(parseISO(enrollment.end_date));
    } else {
      history.push('/enrollments');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enrollment]);

  useEffect(() => {
    function handleEndDate() {
      setEndDate(addMonths(startDate, selectPlan.duration));
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
                name="student_id"
                id="student_id"
                className="studentSelector"
                isSearchable
                isClearable
                setStudent={setStudent}
                defaultValue={student}
                required
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
                  disabled
                  name="end_date"
                  selected={endDate}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="columwidth">
                <span>Total Price</span>
                <CurrencyInput
                  name="price"
                  placeholder="Plan Price"
                  disabled
                  getChange={selectPlan.price * selectPlan.duration}
                />
              </div>
            </div>
          </Form>
        </FormContainer>
      </>
    </Container>
  );
}
