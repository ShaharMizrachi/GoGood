import {StyleSheet, Dimensions} from 'react-native';
import fonts from '../../../styles/fonts';
const {width} = Dimensions.get('screen');
export default StyleSheet.create({
  container: {alignItems: 'center'},

  modalButtons: {
    height: 1500,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  title: {
    fontWeight: '700',
    fontSize: 32,
    fontFamily: fonts.regular,
    color: 'black',
    textAlign: 'center',
  },
  requestDetailed: {},
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
    textAlign: 'center',
  },
  link: {
    fontSize: 15,
    textDecorationLine: 'underline',
    fontFamily: fonts.regular,
    color: '#28449C',
    textAlign: 'center',
  },
  backButton: {
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: '#FED433',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    elevation: 5,
    width: 145,
    borderRadius: 35,
  },
  nextButton: {
    backgroundColor: '#FED433',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 145,
    elevation: 5,

    borderRadius: 35,
  },
  modalButtonText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: 'black',
  },
  headerContainer: {
    flex: 2,
    minHeight: 70,
    alignItems: 'center',
  },
  bodyContainer: {flex: 3, width: width * 0.9, alignItems: 'center'},
  volunteerDetailed: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 155,
    height: 155,
    borderRadius: 1500,
    backgroundColor: '#ebf3fb',
  },
  buttonsContainer: {
    flex: 1,
    width: width * 0.9,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
