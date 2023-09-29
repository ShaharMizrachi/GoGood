import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProfileProps} from './ProfileProps';
import styles from './ProfileStyles';
import {hebrew} from '../../component/Hebrew';
import NavBar from '../../component/ui/NavBar';
import Avatar from '../../assets/images/Avatar';
import EditPenIcon from '../../assets/images/EditPenIcon';
import {useLoginContext} from '../../component/context/Context';
import ArchiveIcon from '../../assets/images/ArchiveIcon';
import StarFull from '../../assets/images/StarFull';
import {GetUserProfilePic} from '../../component/api';
const Profile = ({navigation}: ProfileProps) => {
  const {user} = useLoginContext();
  const [image, setImage] = useState('');
  const onEdit = () => {
    navigation.navigate('EditUser');
  };
  const onButtonPressed = (to: string) => {
    navigation.navigate(to);
  };
  const navigateBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    getProfilePic();
  }, []);

  const getProfilePic = async () => {
    try {
      const profileImage = await GetUserProfilePic(user.id.toString());
      setImage(profileImage.data.url);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <NavBar title={hebrew.profile} navigateBack={navigateBack} />
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.imgContainer}>
            <TouchableOpacity style={styles.editButton} onPress={onEdit}>
              <EditPenIcon />
            </TouchableOpacity>
            {image !== '' ? (
              <Image style={styles.avatar} source={{uri: image}} />
            ) : (
              <Avatar />
            )}
          </View>
          <View style={styles.paragraph}>
            <Text style={styles.title}>{user.fullName}</Text>
            {/* <View style={styles.phone}>
              <Text style={styles.text}>{formatPhoneNumber(user.phone)}</Text>
              <CallIcon />
            </View> */}
            <Text style={styles.p}>{user.userDescription}</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Reviews', {id: user.id})}>
            <ArchiveIcon />
            <Text style={[styles.buttonText, {marginTop: '8%'}]}>
              {hebrew.to_reviews}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onButtonPressed('Archive')}>
            <StarFull />
            <Text style={[styles.buttonText, {marginTop: '8%'}]}>
              {hebrew.to_archive}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default Profile;
