import { StyleSheet } from 'react-native';
import fonts from '../../../styles/fonts';

export default StyleSheet.create({
  container: { height: '100%', alignItems: 'center', width: '90%' },
  head: { height: '50%', alignItems: 'center', justifyContent: 'center' },
  body: { height: '35%', alignItems: 'center' },
  profileBox: {},
  buttonContainer: {
    height: '15%',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
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
    fontSize: 18,
    fontFamily: fonts.regular,
    color: 'black',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: '700',
    fontSize: 17,
    fontFamily: fonts.regular,
    color: 'black',
    textAlign: 'center',
  },
  regularText: {
    fontSize: 17,
    fontFamily: fonts.regular,
    color: 'black',
    lineHeight: 35,
    textAlign: 'right',
  },
  generalTextSetings: {
    fontFamily: fonts.regular,
    color: 'black',
    fontSize: 18,
  },
  closeLink: {
    textDecorationLine: 'underline',
  },
});
