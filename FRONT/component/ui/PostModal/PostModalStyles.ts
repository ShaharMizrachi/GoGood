import {StyleSheet} from 'react-native';
import fonts from '../../../styles/fonts';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upper: {
    flex: 3,
    width: '80%',
    alignItems: 'center',
  },
  bottom: {flex: 1, width: '90%', alignItems: 'center'},
  title: {
    paddingTop: 15,
    fontWeight: '700',
    fontSize: 32,
    fontFamily: fonts.regular,
    color: 'black',
    textAlign: 'center',
  },
  subTitle: {
    paddingTop: 30,
    fontWeight: '400',
    fontSize: 20,
    fontFamily: fonts.regular,
    color: 'black',
    lineHeight:25,
    textAlign: 'center',
  },
});
