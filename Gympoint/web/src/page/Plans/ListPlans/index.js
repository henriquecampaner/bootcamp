import React, { useEffect, useState } from 'react';
import api from '~/services/api';
import history from '~/services/history';
import Container from '~/template/Container/index';
import StudentHeader from '~/template/ContentHead/index';

import { StudentsList, BtnEdit, BtnDelete } from './styles';

export default function Students() {
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

  return (
    <Container>
      <>
        <StudentHeader title="Plans Manager" Plan to="/plans/create" />
        <StudentsList>
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
                  <td>{plan.price}</td>
                  <td>
                    <BtnEdit
                      type="BtnEdit"
                      onClick={() => history.push(`/plans/edit/${plan.id}`)}
                    >
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
        </StudentsList>
      </>
    </Container>
  );
}
