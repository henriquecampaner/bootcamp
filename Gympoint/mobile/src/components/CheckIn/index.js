import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Left, Right } from './styles';

export default function Checkin({ data }) {
  const formattedDate = useMemo(() => {
    return formatRelative(parseISO(data.updatedAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.updatedAt]);

  return (
    <Container>
      <Left>Check-in #{data.id}</Left>
      <Right>{formattedDate}</Right>
    </Container>
  );
}
