import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

const IconButton = ({
  icon,
  onPress,
  extraStyles,
}: {
  icon: ImageSourcePropType;
  onPress: (event: GestureResponderEvent) => void;
  extraStyles?: StyleProp<ViewStyle>;
}) => {
  return (
    <View>
      {onPress && onPress !== undefined && (
        <Pressable
          onPress={onPress}
          style={[
            styles.buttonContainer,
            extraStyles ? extraStyles : undefined,
          ]}
          android_ripple={{color: '#ffffff'}}>
          <Image style={styles.iconStyle} source={icon} />
        </Pressable>
      )}
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: 7,
    overflow: 'hidden',
    height: 40,
    width: 40,
  },
  iconStyle: {
    width: '100%',
    height: '100%',
  },
});
