import React, { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import api from '~/services/api';
import Container from '~/template/Container/index';
import ContentHead from '~/template/ContentHead';

import { EnrollmentList, BtnDelete } from './styles';

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
                <th>Start Date</th>
                <th>End Date</th>
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
                  <td>
                    {format(new Date(enrollment.start_date), 'dd-MM-yyyy')}
                  </td>
                  <td>{format(new Date(enrollment.end_date), 'dd-MM-yyyy')}</td>
                  <td>
                    {enrollment.active ? (
                      <MdCheckCircle color="#42cb59" size={20} />
                    ) : (
                      <MdCheckCircle color="#ddd" size={20} />
                    )}
                  </td>
                  <td>
                    <Link
                      to={{
                        pathname: `enrollments/edit/${enrollment.id}`,
                        state: { enrollment },
                      }}
                    >
                      Edit
                    </Link>
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
