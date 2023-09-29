import React, {useState} from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import IconButton from './IconButton';
import {useModal} from 'react-native-modalfy';

function ModalPopup({
  children,
  open,
  navigation,
  closeAll = false,
}: {
  children: JSX.Element;
  open: boolean;
  closeAll?: boolean;
  navigation?: Function;
}) {
  const [modalVisible, setModalVisible] = useState(open);
  const {currentModal, closeAllModals, closeModal} = useModal();
  const onCloseModalHandler = () => {
    setModalVisible(false);
    if (navigation) {
      navigation();
    }
    if (closeAll) {
      return closeAllModals();
    }
    if (currentModal) {
      closeModal(currentModal);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.container}>
        <View style={styles.centeredView}>
          <View style={styles.closeContainer}>
            <IconButton
              extraStyles={styles.closeText}
              icon={require('../../assets/images/xx.png')}
              onPress={onCloseModalHandler}
            />
          </View>
          <View style={styles.contant}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#28449C', width: '100%', height: '100%'},
  centeredView: {
    backgroundColor: 'white',
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    marginTop: 30,
  },
  buttonContainer: {
    margin: 5,
  },
  closeText: {
    fontSize: 22,
    width: 26,
    height: 26,
    color: 'black',
  },
  contant: {
    alignItems: 'center',
  },
  closeContainer: {
    top: 20,
    left: 20,
  },
});

export default ModalPopup;
