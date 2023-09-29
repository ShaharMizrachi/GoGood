import React from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const PrimaryButton = (props: {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  const {onPress, title} = props;
  return (
    <View style={styles.buttonOuterContainer}>
      {onPress && onPress !== undefined && (
        <Pressable
          onPress={onPress}
          style={styles.buttonContainer}
          android_ripple={{color: '#ffffff'}}>
          <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 7,
  },
  buttonContainer: {
    backgroundColor: colors.yellow500,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 7,
    height: 55,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 34,
    color: '#313131',
    justifyContent: 'center',
    fontFamily: fonts.regular,
  },
});
