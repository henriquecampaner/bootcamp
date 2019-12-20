import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';

import api from '~/services/api';

import HeaderTitle from '~/components/HeaderTitle';
import Background from '~/components/Background';
import Checkin from '~/components/CheckIn';
import SignOutButton from '~/components/SignOut';

import { Container, NewCheckinButton, List } from './styles';

function Checkins({ isFocused }) {
  const studentId = useSelector(state => state.auth.studentId);

  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCheckins = useCallback(async () => {
    const response = await api.get(`/students/${studentId}/checkins`);

    setCheckins(response.data);
  }, [studentId]);

  useEffect(() => {
    const abortController = new AbortController();

    if (isFocused) {
      loadCheckins();
    }

    return () => {
      abortController.abort();
    };
  }, [isFocused, loadCheckins]);

  const handleNewCheckin = async () => {
    try {
      setLoading(true);
      await api.post(`/students/${studentId}/checkins`);

      loadCheckins();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Check-in limit exceeded!',
        'Students can only do 5 check-ins every 7 days.'
      );
    }
  };

  return (
    <Background>
      <Container>
        <NewCheckinButton onPress={handleNewCheckin} loading={loading}>
          New check-in
        </NewCheckinButton>

        <List
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Checkin data={item} />}
        />
      </Container>
    </Background>
  );
}

Checkins.navigationOptions = {
  headerTitle: () => <HeaderTitle />,
  headerLeft: () => <SignOutButton />,
};

export default withNavigationFocus(Checkins);
