import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import fonts from '../../styles/fonts';

const RoundButtonWithoutBackgroundColor = ({
  text,
  callback,
  style,
}: {
  text: string;
  callback: any;
  style?: any;
}) => {
  const handlePress = () => {
    if (callback) {
      callback();
    }
  };

  const buttonStyle = {...styles.button, ...style};

  return (
    <>
      <Pressable
        onPress={() => handlePress()}
        android_ripple={{color: '#ffffff'}}>
        <View style={buttonStyle}>
          <Text style={styles.textInButton}>{text}</Text>
        </View>
      </Pressable>
    </>
  );
};

export default RoundButtonWithoutBackgroundColor;

const styles = StyleSheet.create({
  button: {
    borderColor: '#FED433',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 25.85,
    padding: 7.25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 128,
    height: 33.04,
  },
  textInButton: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
    color: '#313131',
    width: 150,
    height: 18,
  },
});
