import { StyleSheet, Dimensions } from 'react-native';
import fonts from '../../styles/fonts';
const width = Dimensions.get("screen").width
export default StyleSheet.create({
  container: { backgroundColor: '#f6feff', maxHeight: 190,minHeight: 140, width: width * 0.9, alignItems: 'center', justifyContent: 'center', borderRadius: 10, },
  subContainer: { height: '90%', width: '90%', flexWrap: 'wrap' },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50
  },

  starsContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    borderColor: 'rgba(159, 159, 159, 0.5)',
    borderWidth: 0.5,
    height: 30,
    justifyContent: 'center',
    elevation: 1,
  },
  watchProfileLink: {
    fontSize: 15.04,
    color: '#28449C',
    textDecorationLine: 'underline',
    marginTop: '2%',
  },
  imageContainer: { alignItems: 'center', justifyContent: 'center' },
  body: {
    alignItems: 'flex-end'
  },
  down: { height: '50%', width: '100%', alignItems: 'center', justifyContent: 'center' },
  up: {
    height: '50%', width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 17,
    fontFamily: fonts.regular,
    color: 'black',
    textAlign: 'right',
  }
});
