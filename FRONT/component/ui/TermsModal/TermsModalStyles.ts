import {StyleSheet, Dimensions} from 'react-native';
import fonts from '../../../styles/fonts';
const width = Dimensions.get('screen').width;
export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    color: 'black',
    fontSize: 32,
    fontFamily: fonts.regular,
    fontWeight: '700',
  },
  body: {
    color: 'black',
    fontSize: 16,
    fontFamily: fonts.regular,

    fontWeight: '400',
  },
  top: {flex: 0.8, justifyContent: 'center'},
  bottom: {flex: 6, width: '100%'},
  buttonContainer: {flex: 1.2, width: '100%', paddingTop: 25},
  buttonText: {color: 'black', fontSize: 20, fontFamily: fonts.regular},
  button: {
    height: 57,
    backgroundColor: '#FED433',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    elevation: 8,
  },
  scroll: {width: '90%', alignSelf: 'center',paddingBottom:50},
});
