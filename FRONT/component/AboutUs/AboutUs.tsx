import {View, Image, Text} from 'react-native';
import React from 'react';
import {AboutUsProps} from './AboutUsProps';
import styles from './AboutUsStyles';
import NavBar from '../ui/NavBar';
import {hebrew} from '../Hebrew';
import ZigitIcon from '../../assets/images/ZigitIcon';

export const AboutUs = ({navigation}: AboutUsProps) => {
  return (
    <>
      <NavBar
        title={hebrew.littleBit_aboutUs}
        navigateBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ZigitIcon />
        <Image
          style={styles.img}
          source={require('../../assets/images/ZigitTeam.png')}
        />
        <Text style={styles.paragraph}>{hebrew.aboutUsBody}</Text>
      </View>
    </>
  );
};
