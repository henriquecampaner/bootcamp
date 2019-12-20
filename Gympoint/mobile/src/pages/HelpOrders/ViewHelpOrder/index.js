import React from 'react';

import HeaderTitle from '~/components/HeaderTitle';
import Background from '~/components/Background';
import GoBackButton from '~/components/GoBackButton';

import {
  Container,
  Top,
  Left,
  Right,
  Content,
  Question,
  Answer,
} from './styles';

export default function ViewHelpOrder({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder');
  const formattedDate = navigation.getParam('formattedDate');

  return (
    <Background>
      <Container>
        <Top>
          <Left>PERGUNTA</Left>

          <Right>{formattedDate}</Right>
        </Top>

        <Question>
          <Content>{helpOrder.question}</Content>
        </Question>

        <Top>
          <Left>RESPOSTA</Left>
        </Top>

        <Answer>
          <Content>{helpOrder.answer}</Content>
        </Answer>
      </Container>
    </Background>
  );
}

ViewHelpOrder.navigationOptions = ({ navigation }) => ({
  headerTitle: () => <HeaderTitle />,
  headerLeft: () => <GoBackButton navigation={navigation} />,
});
