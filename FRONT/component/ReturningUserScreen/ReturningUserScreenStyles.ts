import {StyleSheet, Dimensions} from 'react-native';
import fonts from '../../styles/fonts';
const width = Dimensions.get('screen').width;
export default StyleSheet.create({
  generalPageContainer: {
    width: '100%',
    height: '100%',

    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
    width: '100%',
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  errofram: {
    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  input: {
    marginTop: '10%',
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 12,
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 22,
    color: 'black',
    width: '80%',
    textAlign: 'right',
  },
  button: {
    width: '90%',

    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fed433',
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontFamily: fonts.regular,
    fontSize: 18,
    textAlign: 'center',
  },
  headline: {
    color: 'white',
    marginTop: '8%',
    fontSize: 32,
    fontWeight: '700',
    fontFamily: fonts.regular,
  },
  subTitle: {
    margin: '5%',
    textAlign: 'center',
    width: '60%',
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: fonts.regular,
  },
  alert_container: {
    width: '100%',

    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginLeft: '2.5%',
  },
  wrong_phone_alert: {
    color: 'white',
  },
});
