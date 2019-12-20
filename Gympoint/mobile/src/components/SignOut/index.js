import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

import { signOut } from '~/store/modules/auth/actions';

export default function SignOutButton() {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    console.tron.log('useHandleSignOut');
    dispatch(signOut());
  };

  return (
    <TouchableOpacity onPress={handleSignOut} style={{ marginLeft: 8 }}>
      <Icon name="logout" size={20} color="#707070" />
    </TouchableOpacity>
  );
}
