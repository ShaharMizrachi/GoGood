import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import IconButton from './IconButton';
import MenuPage from '../../screens/MenuPage';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const NavBar = ({
  title,
  navigateBack,
  style = {},
}: {
  title: string;
  navigateBack?: Function;
  style?: any;
}) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const displayArrowBack: boolean = title !== 'ראשי';
  const back = () => {
    if (navigateBack) {
      navigateBack();
    }
  };
  return (
    <View style={[styles.BarContainer, style]}>
      <View style={styles.IconContainer}>
        <IconButton
          extraStyles={styles.hamburgerStyle}
          icon={require('../../assets/images/hamburger.png')}
          onPress={() => setOpenMenu(prev => !prev)}
        />
      </View>
      {openMenu && <MenuPage setOpenMenu={setOpenMenu} />}
      <View style={styles.textContainer}>
        <Text style={styles.textDir}>{title}</Text>
      </View>
      <View style={styles.IconContainer}>
        {displayArrowBack ? (
          <IconButton
            extraStyles={styles.hamburgerStyle}
            icon={require('../../assets/images/back.png')}
            onPress={back}
          />
        ) : null}
      </View>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  BarContainer: {
    backgroundColor: colors.blue500,
    height: 50,
    flexDirection: 'row-reverse',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textDir: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.regular,
  },
  textContainer: {
    alignSelf: 'center',
  },
  hamburgerStyle: {
    height: 25,
    width: 25,
  },
  IconContainer: {
    // justifyContent:"flex-start"
  },
});
