import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '~/services/api';
import Container from '~/template/Container/index';
import StudentHeader from '~/template/ContentHead/index';
import { formatPrice } from '~/util/format';
import { planRequest } from '~/store/modules/plan/actions';
import history from '~/services/history';

import { PlansList, BtnEdit, BtnDelete } from './styles';

export default function Students() {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);

  async function loadplans() {
    const { data } = await api.get('plans');
    setPlans(data);
  }

  useEffect(() => {
    loadplans();
  }, []);

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Do you want to delete this Plan?') === true) {
      await api.delete(`plans/${id}`);

      loadplans();
    }
  }

  async function handleEdit(plan) {
    dispatch(planRequest(plan));
    history.push(`/plans/edit/${plan.id}`);
  }

  return (
    <Container>
      <>
        <StudentHeader title="Plans Manager" Create to="/plans/create" />
        <PlansList>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Duration</th>
                <th>Price/month </th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th />
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>{plan.duration}</td>
                  <td>{formatPrice(plan.price)}</td>
                  <td>
                    <BtnEdit type="BtnEdit" onClick={() => handleEdit(plan)}>
                      Edit
                    </BtnEdit>
                    <BtnDelete
                      type="button"
                      onClick={() => {
                        handleDelete(plan.id);
                      }}
                    >
                      Delete
                    </BtnDelete>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PlansList>
      </>
    </Container>
  );
}
