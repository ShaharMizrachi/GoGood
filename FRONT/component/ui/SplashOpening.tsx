import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';
import LoadingSpinner from './LoadingSpinner';

const SplashOpening = () => {
  return (
    <>
      <LinearGradient
        style={{flex: 1}}
        colors={[colors.blue700, colors.blue500]}>
        <View style={styles.imagesContainer}>
          <View style={styles.ContainerHi}>
            <Image
              style={styles.monster_hi_GoGood}
              source={require('../../assets/images/monster_hi.png')}
            />
          </View>
          <View style={styles.ContainerGoGood}>
            <Image
              style={styles.monster_hi_GoGood}
              source={require('../../assets/images/GoGood.png')}
            />
          </View>
        </View>
        <View style={styles.spinner}>
          <LoadingSpinner color={'#69D7C7'} setHeight={53} />
        </View>
      </LinearGradient>
    </>
  );
};

export default SplashOpening;

const styles = StyleSheet.create({
  imagesContainer: {
    top: 150,
    left: 130,
  },
  monster_hi_GoGood: {
    width: '100%',
    height: '100%',
  },
  ContainerGoGood: {
    width: 290,
    height: 70,
    right: 70,
    top: 30,
  },
  ContainerHi: {
    width: 120,
    height: 150,
  },
  spinner: {
    position: 'absolute',
    top: 500,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
