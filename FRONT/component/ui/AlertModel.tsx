import React from 'react';
import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const AlertModel = ({
  text,
  setShow,
  children,
}: {
  text: string;
  setShow: any;
  children?: JSX.Element;
}) => {
  return (
    <Modal transparent={true} visible={true}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{width: 300, height: 500}}>
          <View style={styles.modalContainer}>
            <Text onPress={setShow} style={styles.exit}>
              X
            </Text>
            <View style={styles.imageContainert}>
              <Image source={require('../../assets/images/monster_hi.png')} />
            </View>
            <View>
              <Text style={styles.bodyText}>{text}</Text>
            </View>
            <View>{children}</View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModel;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.blue500,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 15,
  },
  imageContainert: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bodyText: {
    marginTop: 17,
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    padding: 8,
    lineHeight: 22,
    fontFamily: fonts.regular,
  },
  exit: {
    fontSize: 25,
    marginLeft: 15,
  },
});
