import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Top, Left, Answered, Right, Content } from './styles';

export default function HelpOrder({ helpOrder, navigation }) {
  const formattedDate = useMemo(() => {
    return formatRelative(parseISO(helpOrder.updatedAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [helpOrder.updatedAt]);

  const handleNavigate = () =>
    navigation.navigate('ViewHelpOrder', { helpOrder, formattedDate });

  return (
    <Container onPress={handleNavigate}>
      <Top>
        <Left>
          {helpOrder.answer ? (
            <>
              <Icon name="check-circle" size={20} color="#42cb59" />
              <Answered answered>Respondido</Answered>
            </>
          ) : (
            <>
              <Icon name="check-circle" size={20} color="#999" />
              <Answered answered={false}>Sem resposta</Answered>
            </>
          )}
        </Left>

        <Right>{formattedDate}</Right>
      </Top>

      <Content>{helpOrder.question}</Content>
    </Container>
  );
}
