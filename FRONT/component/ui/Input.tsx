import React, {useState} from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import fonts from '../../styles/fonts';
import AlertBox from '../../assets/images/AlertBox';

const Input = ({
  placeHolder,
  multiline,
  numberOfLines,
  editable,
  extraStyles,
  text,
  errorMessage = '',
  textChanged,
  keybordType,
  ...rest
}: {
  placeHolder: string;
  multiline?: boolean;
  numberOfLines?: number;
  keybordType?: KeyboardTypeOptions;
  editable?: boolean;
  extraStyles?: StyleProp<ViewStyle>;
  text?: string;
  errorMessage?: string;
  textChanged?: React.SetStateAction<any>;
  [key: string]: any;
}) => {
  const errorStyle = errorMessage ? styles.errorStyle : {};
  return (
    <>
      <TextInput
        textAlignVertical="top"
        style={[
          styles.inputTextStyle,
          extraStyles ? extraStyles : undefined,
          errorStyle,
        ]}
        placeholderTextColor={'#B4B4B4'}
        placeholder={placeHolder}
        multiline={multiline ? multiline : false}
        numberOfLines={numberOfLines ? numberOfLines : 1}
        editable={editable === false ? editable : true}
        onChangeText={t => textChanged(t)}
        value={text}
        keyboardType={keybordType ? keybordType : 'default'}
        {...rest}
      />
      {errorMessage && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <AlertBox />
        </View>
      )}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputTextStyle: {
    marginVertical: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 12,
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'right',
    color: 'black',
  },
  errorText: {
    color: 'red',
    paddingRight: 5,
    fontWeight: '400',
    fontStyle: fonts.regular,

    fontSize: 12,
  },
  errorContainer: {
    width: '65%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    color: 'red',
    paddingBottom: 15,
  },
  errorStyle: {
    borderWidth: 1,
    marginBottom: 0,
    borderColor: 'red',
  },
});
