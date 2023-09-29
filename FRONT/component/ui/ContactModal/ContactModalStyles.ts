import { StyleSheet } from 'react-native';
import fonts from '../../../styles/fonts';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  titleContainer: { flex: 1.5, justifyContent: 'flex-end' },
  profileContainer: {
    width: '80%',
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 20,
  },
  buttonContainer: {
    flex: 3.5,
  },
  title: { fontSize: 32, fontFamily: fonts.regular, fontWeight: '700' },
  buttonText: { fontSize: 14, fontFamily: fonts.regular, color: 'white' },
  name: {
    marginTop: -10,
    fontSize: 16,
    fontFamily: fonts.bold,
    fontWeight: '700',
    color: 'black',
  },
  paragraph: {
    marginTop: 25,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: '#313131',
  },
  link: {
    fontSize: 15,
    fontFamily: fonts.regular,
    fontWeight: '400',
    paddingBottom: 2,
    color: 'blue',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: 'blue',
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
});
