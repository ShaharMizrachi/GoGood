import React from 'react';
import {GestureResponderEvent, Modal, StyleSheet, View} from 'react-native';
import IconButton from './IconButton';

const ListModal = ({
  showModal,
  closeModal,
  children,
}: {
  showModal: boolean;
  closeModal: (event: GestureResponderEvent) => void;
  children: JSX.Element;
}) => {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.buttonClose}>
              <IconButton
                extraStyles={{width: 22, height: 22}}
                onPress={closeModal}
                icon={require('../../assets/images/xx.png')}
              />
            </View>
            <View style={styles.content}>{children}</View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ListModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  content: {
    marginTop: 30,
    marginBottom: 5,
  },
});
