import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import StarFull from '../../assets/images/StarFull';
import StarEmpty from '../../assets/images/StarEmpty';

const StarsRate = ({
  setRatingNumber,
  defultStarNumber,
  disable = false,
  width,
}: {
  setRatingNumber: Function;
  defultStarNumber?: number;
  disable?: boolean;
  width?: string;
}) => {
  const rateNumber = [1, 2, 3, 4, 5];
  const [choosedNUmber, setChoosedNUmber] = useState<number>(0);

  useEffect(() => {
    setChoosedNUmber(defultStarNumber || 0);
  }, [defultStarNumber]);

  return (
    <View style={styles.imagesContainer}>
      {rateNumber.map((num, index) => {
        return (
          <Pressable
            style={[styles.imageS, {width}]}
            key={index}
            onPress={() => {
              if (disable) {
                return;
              }
              setChoosedNUmber(num);
              setRatingNumber(num);
            }}>
            {num <= choosedNUmber ? <StarFull /> : <StarEmpty />}
          </Pressable>
        );
      })}
    </View>
  );
};

export default StarsRate;

const styles = StyleSheet.create({
  imageS: {
    // height: 40,

    marginHorizontal: 4,
  },
  imagesContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 5,
  },
});
