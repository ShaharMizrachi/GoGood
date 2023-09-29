import {StyleSheet} from 'react-native';
import fonts from '../../styles/fonts';

export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ebf3fb',
    alignItems: 'center',
  },
  notification: {
    height: '20%',
    width: '85%',
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#CECECE',
    marginBottom:20
  },
  general: {height: '80%', width: '90%'},
  row: {
    alignSelf: 'center',
    height: 60,
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: fonts.regular,
    color: 'black',
  },
  rowText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: fonts.regular,
    color: 'black',
  },
});
