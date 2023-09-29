import {StyleSheet, Dimensions} from 'react-native';
import fonts from '../../styles/fonts';
const {height} = Dimensions.get('screen');
export default StyleSheet.create({
  container: {width: '100%', height: height - 50, backgroundColor: '#EBF3FB'},
  title: {
    fontSize: 16,
    fontFamily: fonts.regular,
    fontWeight: '700',
    color: 'black',
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: 'black',
  },
  titleContainer: {
    height: '10%',
    justifyContent: 'center',
  },
  inputs: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    width: '70%',
    elevation: 3,
  },
  buttonContainer: {
    height: '20%',

    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 55,
    width: '80%',
    elevation: 3,
    borderRadius: 30,
    backgroundColor: '#fed433',
  },
});
