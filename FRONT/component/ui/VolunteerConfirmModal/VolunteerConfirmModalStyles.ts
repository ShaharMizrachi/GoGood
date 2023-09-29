import {StyleSheet, Dimensions} from 'react-native';
import fonts from '../../../styles/fonts';
const {width} = Dimensions.get('screen');
export default StyleSheet.create({
  container: {alignItems: 'center'},

  backButton: {
    backgroundColor: '#FED433',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 145,
    elevation: 5,

    borderRadius: 35,
  },
  modalButtons: {
    height: 1500,
  },
  subTitle: {
    marginTop: 25,
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
  nextButton: {
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 40,
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
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 2,
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  volunteerDetailed: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 155,
    height: 155,
  },
  buttonsContainer: {
    flex: 3,
    width: width * 0.9,
    alignItems: 'center',
  },
  button: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#0064C3',
    width: '40%',
    height: 45,
  },
  buttonText: {fontSize: 14, fontFamily: fonts.regular, color: 'white'},
});
