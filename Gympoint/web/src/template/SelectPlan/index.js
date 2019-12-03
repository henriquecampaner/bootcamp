import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import api from '~/services/api';

export default function PlanSelector({ name, setPlan, ...rest }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const loadStudentsAndPlans = async () => {
      const loadedPlans = await api.get('/plans');

      const planOptions = [];
      loadedPlans.data.forEach(plan =>
        planOptions.push({
          value: plan.id,
          label: plan.title,
          duration: plan.duration,
          price: plan.price,
          total_price: plan.total_price,
        })
      );

      setPlans(planOptions);
    };

    loadStudentsAndPlans();
  }, []);

  const handleChange = change => (change ? setPlan(change) : setPlan({}));

  return (
    <Select
      name={name}
      aria-label={name}
      options={plans}
      onChange={handleChange}
      {...rest}
    />
  );
}

PlanSelector.propTypes = {
  name: PropTypes.string.isRequired,
  setPlan: PropTypes.func.isRequired,
};
