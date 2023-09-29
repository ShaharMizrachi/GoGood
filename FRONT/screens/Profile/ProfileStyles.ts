import {StyleSheet} from 'react-native';
import fonts from '../../styles/fonts';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  top: {
    flex: 0.8,
    backgroundColor: '#0064C3',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottom: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebf3fb',
    paddingTop: '15%',
    flexDirection: 'row',
  },
  picContainer: {},
  paragraph: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-evenly',

    flex: 1,
  },
  p: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.regular,
    lineHeight: 25,
    paddingBottom: 25,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.regular,
    fontWeight: '700',
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.regular,
    paddingRight: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: fonts.regular,
    paddingRight: 10,
  },
  button: {
    width: '35%',
    height: '35%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '50%',
    marginHorizontal: '5%',
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  imgContainer: {
    flex: 0.8,
    justifyContent: 'flex-end',
  },
  phone: {flexDirection: 'row'},
  editButton: {position: 'absolute', zIndex: 150, top: '20%', right: '-3%'},
});
