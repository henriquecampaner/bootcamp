import React from 'react';
import { Text, Button, Alert } from 'react-native';
import { Container } from './styles';

export default function Home() {
  return (
    <Container>
      <Text>Oi</Text>

      <Button
        title="asddasdas"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
    </Container>
  );
}
