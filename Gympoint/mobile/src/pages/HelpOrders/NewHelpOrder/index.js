import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import api from '~/services/api';

import HeaderTitle from '~/components/HeaderTitle';
import Background from '~/components/Background';
import GoBackButton from '~/components/GoBackButton';

import {
  Container,
  InputContainer,
  NewHelpOrderButton,
  NewOrderInput,
} from './styles';

export default function NewHelpOrder({ navigation }) {
  const studentId = useSelector(state => state.auth.studentId);

  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewCheckin = async () => {
    try {
      setLoading(true);
      await api.post(`/students/${studentId}/help_orders`, {
        question,
      });

      setQuestion('');
      navigation.goBack();
      Alert.alert(
        'Pedido de auxílio enviado!',
        'A nossa equipe atenderá o teu pedido o antes possível.'
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Falha no envio!', 'Verifique seus dados.');
    }
  };

  return (
    <Background>
      <Container>
        <InputContainer>
          <NewOrderInput
            placeholder="Inclua seu pedido de auxílio"
            autoCorrect
            multiline
            returnKeyType="send"
            onSubmitEditing={handleNewCheckin}
            value={question}
            onChangeText={setQuestion}
          />
        </InputContainer>

        <NewHelpOrderButton onPress={handleNewCheckin} loading={loading}>
          Enviar pedido
        </NewHelpOrderButton>
      </Container>
    </Background>
  );
}

NewHelpOrder.navigationOptions = ({ navigation }) => ({
  headerTitle: () => <HeaderTitle />,
  headerLeft: () => <GoBackButton navigation={navigation} />,
});
