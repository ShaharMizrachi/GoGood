import {StyleSheet} from 'react-native';
import fonts from '../../styles/fonts';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  headline: {margin: 17},
  title: {
    color: '#000000',
    fontFamily: fonts.regular,
    fontSize: 18,
    fontWeight: '700',
  },
  content: {flex: 25},
});
