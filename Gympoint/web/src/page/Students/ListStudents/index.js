import React, { useEffect, useState } from 'react';
import api from '~/services/api';
import history from '~/services/history';
import Container from '~/template/Container/index';
import ContentHead from '~/template/ContentHead';

import { StudentsList, BtnEdit, BtnDelete } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const { data } = await api.get('students');
      setStudents(data);
    }

    loadStudents();
  }, []);

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Do you want to delete this student?') === true) {
      await api.delete(`students/${id}`);

      setStudents(students.filter(student => student.id !== id));
    }
  }

  return (
    <Container>
      <>
        <ContentHead title="Student Manager" newStudent to="/students/create" />
        <StudentsList>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>E-mail</th>
                <th>Age</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th />
              </tr>
            </thead>
            <tbody>
              {students.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.age}</td>
                  <td>
                    <BtnEdit
                      type="BtnEdit"
                      onClick={() => history.push(`/students/edit/${item.id}`)}
                    >
                      Edit
                    </BtnEdit>
                    <BtnDelete
                      type="button"
                      onClick={() => {
                        handleDelete(item.id);
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
