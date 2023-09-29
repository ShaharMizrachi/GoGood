import React, {useEffect, useState} from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const SeconderyButton = ({
  onPress,
  title,
  extraStyles,
  defulteButtonStatus,
}: {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  extraStyles?: StyleProp<ViewStyle>;
  defulteButtonStatus?: boolean;
}) => {
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    if (defulteButtonStatus != undefined) setPressed(defulteButtonStatus);
  }, [defulteButtonStatus]);

  return (
    <View style={styles.buttonOuterContainer}>
      {onPress && onPress !== undefined && (
        <Pressable
          onPress={e => {
            onPress(e);
            setPressed(prev => !prev);
          }}
          style={[
            styles.buttonContainer,
            pressed ? styles.press : undefined,
            extraStyles ? extraStyles : undefined,
          ]}
          android_ripple={{color: '#ffffff'}}>
          <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default SeconderyButton;
const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 5,
  },
  buttonContainer: {
    backgroundColor: colors.green500,
    paddingHorizontal: 18,
    paddingVertical: 8,
    elevation: 7,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    color: '#313131',
    justifyContent: 'center',
    fontFamily: fonts.regular,
  },
  press: {
    backgroundColor: '#B9CBE6',
    color: '#000000',
  },
});
