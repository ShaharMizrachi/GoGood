import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import fonts from '../../styles/fonts';

const EmptyRequstsUser = ({
  title,
  bodyText,
}: {
  title: string;
  bodyText: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.ImageContainer}>
        <Image
          style={styles.Image}
          source={require('../../assets/images/Nothing_Monster.png')}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{bodyText}</Text>
      </View>
    </View>
  );
};

export default EmptyRequstsUser;

const styles = StyleSheet.create({
  textContainer: {
    alignSelf: 'center',
    padding: 50,
  },
  container: {
    marginTop: 60,
  },
  title: {
    color: 'black',
    fontFamily: fonts.bold,
    fontSize: 18,
    textAlign: 'center',
  },
  body: {
    color: 'black',
    fontFamily: fonts.regular,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 13,
  },
  Image: {
    height: '100%',
    width: '100%',
  },
  ImageContainer: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
});
