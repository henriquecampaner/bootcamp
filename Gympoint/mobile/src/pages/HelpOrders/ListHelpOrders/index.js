import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import HeaderTitle from '~/components/HeaderTitle';
import Background from '~/components/Background';
import HelpOrder from '~/components/HelpOrder';
import SignOutButton from '~/components/SignOut';

import { Container, NewHelpOrderButton, List } from './styles';

function ListHelpOrders({ navigation, isFocused }) {
  const studentId = useSelector(state => state.auth.studentId);

  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`/students/${studentId}/help-orders`);

      setHelpOrders(response.data);
    }
    loadHelpOrders();
    console.tron.log(studentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const abortController = new AbortController();

  //   if (isFocused) {
  //     loadHelpOrders();
  //   }

  //   return () => {
  //     abortController.abort();
  //   };
  // }, [isFocused]);

  const handleNewCheckin = async () => {
    navigation.navigate('NewHelpOrder');
  };

  return (
    <Background>
      <Container>
        <NewHelpOrderButton onPress={handleNewCheckin}>
          Novo pedido de auxílio
        </NewHelpOrderButton>

        <List
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item: helpOrder }) => (
            <HelpOrder helpOrder={helpOrder} navigation={navigation} />
          )}
        />
      </Container>
    </Background>
  );
}

ListHelpOrders.navigationOptions = {
  headerTitle: () => <HeaderTitle />,
  headerLeft: () => <SignOutButton />,
};

export default withNavigationFocus(ListHelpOrders);
