import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import gb from 'date-fns/locale/en-GB';

import { Container, Left, Right } from './styles';

export default function Checkin({ data }) {
  const formattedDate = useMemo(() => {
    return formatRelative(parseISO(data.updatedAt), new Date(), {
      locale: gb,
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
