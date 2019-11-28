import React, { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';
import Container from '~/template/Container/index';
import ContentHead from '~/template/ContentHead';

import { EnrollmentList, BtnEdit, BtnDelete } from './styles';

export default function Students() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function loadEnrollments() {
      const { data } = await api.get('enrollment');
      setEnrollments(data);
    }

    loadEnrollments();
  }, []);

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Do you want to delete this student?') === true) {
      await api.delete(`students/${id}`);

      setEnrollments(enrollments.filter(student => student.id !== id));
    }
  }

  return (
    <Container>
      <>
        <ContentHead title="Enrollments Manager" Create to="/students/create" />
        <EnrollmentList>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Plan</th>
                <th>Start</th>
                <th>End</th>
                <th>Active</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th />
              </tr>
            </thead>
            <tbody>
              {enrollments.map(enrollment => (
                <tr key={enrollment.id}>
                  <td>{enrollment.student.name}</td>
                  <td>
                    {enrollment.plan ? (
                      <>{enrollment.plan.title}</>
                    ) : (
                      'Plan Deleted'
                    )}
                  </td>
                  <td>{enrollment.start_date}</td>
                  <td>{enrollment.end_date}</td>
                  <td>
                    {enrollment.active ? (
                      <MdCheckCircle color="#42cb59" size={20} />
                    ) : (
                      <MdCheckCircle color="#ddd" size={20} />
                    )}
                  </td>
                  <td>
                    <BtnEdit
                      type="BtnEdit"
                      onClick={() =>
                        history.push(`enrollments/edit/${enrollment.id}`)
                      }
                    >
                      Edit
                    </BtnEdit>
                    <BtnDelete
                      type="button"
                      onClick={() => {
                        handleDelete();
                      }}
                    >
                      Delete
                    </BtnDelete>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </EnrollmentList>
      </>
    </Container>
  );
}
