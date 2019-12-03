import React, { useState, useEffect } from 'react';
import Async from 'react-select/async';
import PropTypes from 'prop-types';

import api from '~/services/api';

import { Container } from './styles';

export default function StudentSelector({ name, setStudent, ...rest }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const loadStudentsAndPlans = async () => {
      const loadedStudents = await api.get('/students');

      const studentOptions = [];
      loadedStudents.data.forEach(student =>
        studentOptions.push({ value: student.id, label: student.name })
      );

      setStudents(studentOptions);
    };

    loadStudentsAndPlans();
  }, []);

  function loadOptions(inputValue) {
    return api
      .get(`students?q=${inputValue}`)
      .then(r => r.data)
      .then(r =>
        r.map(student => ({
          label: student.name,
          value: student.id,
        }))
      );
  }

  const handleChange = change => {
    setStudent(change);
  };

  return (
    <Container>
      <Async
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        name={name}
        aria-label={name}
        options={students}
        onChange={handleChange}
        {...rest}
      />
    </Container>
  );
}

StudentSelector.propTypes = {
  name: PropTypes.string.isRequired,
  setStudent: PropTypes.func,
};

StudentSelector.defaultProps = {
  setStudent: null,
};
