import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Students({ children }) {
  return <Container>{children}</Container>;
}

Students.propTypes = {
  children: PropTypes.element.isRequired,
};
