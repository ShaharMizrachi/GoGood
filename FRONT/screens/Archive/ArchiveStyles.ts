import {StyleSheet} from 'react-native';
import fonts from '../../styles/fonts';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  headline: {flex: 1},
  title: {},
  content: {flex: 6},
  postContainer: {
    marginTop: 10,
  },
  add_recommendation: {
    fontFamily: fonts.regular,
    color: 'black',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: '5%',
  },
});
