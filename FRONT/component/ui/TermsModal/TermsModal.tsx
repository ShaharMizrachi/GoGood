import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import styles from './TermsModalStyles';
import ModalPopup from '../ModalPopup';
import {hebrew} from '../../Hebrew';
import RenderHtml from 'react-native-render-html';

export const TermsModal = ({modal: {closeModal, params}}: any) => {
  const {title, body, withButton = true, onNext = () => {}} = params;
  const {width} = useWindowDimensions();
  const handleClick = () => {
    closeModal();
    onNext();
  };
  return (
    <ModalPopup open={true}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.headline}>{title}</Text>
        </View>
        <View style={styles.bottom}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <RenderHtml
              dangerouslyDisableWhitespaceCollapsing={true}
              contentWidth={width * 0.9}
              source={{html: body}}
            />
          </ScrollView>
        </View>
        {withButton && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleClick}>
              <Text style={styles.buttonText}>{hebrew.approve}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ModalPopup>
  );
};
