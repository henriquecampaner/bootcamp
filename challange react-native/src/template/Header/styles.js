import styled from 'styled-components/native';
import logo from '../../assets/logo@3x.png';

export const Wrapper = styled.SafeAreaView`
  flex: 0;
  background: #191920;
  flex-direction: row;
`;

export const Container = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  padding: 20px;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 185px;
  height: 24px;
`;
