import {StyleSheet} from 'react-native';
import fonts from '../../styles/fonts';

export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ebf3fb',
    alignItems: 'center',
    marginTop: '8%',
  },
  img: {
    height: 200,
    width: '90%',
    marginTop: 15,
    marginBottom: 15,
  },
  paragraph: {
    width: '80%',
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    fontFamily: fonts.regular,
  },
});
