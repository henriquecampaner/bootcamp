import React from 'react';

import { Container } from './styles';

export default function Students({children}) {
  return (
    <Container>
        {children}
    </Container>
  );
}
