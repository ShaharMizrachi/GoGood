import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const PostsGallery = ({
  picProblemArray,
  onClick,
  selectedImages,
}: {
  picProblemArray: any;
  [key: string]: any;
}) => {
  const editModeActive = !!onClick;
  const renderItem = ({item, index}: any) => (
    <TouchableOpacity
      disabled={!editModeActive}
      onPress={() => onClick(index)}
      style={[styles.galleryItem, {backgroundColor: item.color}]}>
      <Image resizeMode="cover" style={[styles.image]} source={{uri: item}} />
      {editModeActive && <View style={styles.overlay} />}
      {editModeActive && selectedImages?.[0] && (
        <View style={styles.checkboxContainer}>
          <CheckBox
            tintColors={{
              false: 'white',
              true: 'white',
            }}
            value={selectedImages[index]?.selected || false}
            style={styles.checkbox}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.galleryContainer}>
      <FlatList
        data={picProblemArray}
        contentContainerStyle={styles.containerStyle}
        renderItem={renderItem}
        keyExtractor={item => item}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {height: '100%', width: '100%'},
  galleryItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 5,
    maxHeight: 150,
  },
  overlay: {
    zIndex: 50,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  checkboxContainer: {
    zIndex: 501,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  checkbox: {zIndex: 15},
  galleryContainer: {
    flex: 1,
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
  },
});
export default PostsGallery;
