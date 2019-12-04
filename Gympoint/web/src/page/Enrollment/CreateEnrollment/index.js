import React, { useState, useMemo } from 'react';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
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
  const [student, setStudent] = useState();
  const [selectPlan, SetselectPlan] = useState({ duration: 1 });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [test, setTest] = useState();

  useMemo(() => {
    setTest(true);
    if (test) {
      setEndDate(addMonths(startDate, selectPlan.duration));
    }
    return new Date();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectPlan, startDate]);

  function handleChange(selectedOption) {
    SetselectPlan(selectedOption);
  }

  useMemo(() => {
    setTest(true);
    if (test) {
      setEndDate(addMonths(startDate, selectPlan.duration));
    }
    return new Date();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectPlan, startDate]);

  async function handleSubmit() {
    const student_id = student.value;
    const plan_id = selectPlan.value;
    const start_date = startDate;
    try {
      await api.post(`/enrollment`, { plan_id, student_id, start_date });
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
          form="newEnrollment"
          to="/enrollments"
        />

        <FormContainer>
          <Form
            initialData
            id="newEnrollment"
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
                required
                placeholder="Buscar aluno"
              />
            </div>

            <div className="colum">
              <div className="columwidth">
                <span>Plan</span>
                <SelectPlan
                  name="plan_id"
                  id="plan_id"
                  className="planSelector"
                  isSearchable={false}
                  isClearable
                  required
                  placeholder="Selecione o plano"
                  setPlan={SetselectPlan}
                  onChange={handleChange}
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
                  dateFormat="dd/MM/yyyy"
                  name="end_date"
                  disabled
                  selected={endDate}
                />
              </div>
              <div className="columwidth">
                <span>Total Price</span>
                <CurrencyInput
                  name="price"
                  placeholder="Plan Price"
                  readOnly
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
