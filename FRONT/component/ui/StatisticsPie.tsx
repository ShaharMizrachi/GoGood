import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PieChart from 'react-native-pie-chart';
import fonts from '../../styles/fonts';

const StatisticsPie = ({
  series,
  doughnut,
  title,
}: {
  series: {amount: number; name: string}[];
  doughnut: boolean;
  title: string;
}) => {
  const [seriesNumbers, setSeriesNumbers] = useState<number[]>([]);
  const [names, setNames] = useState<{name: string; color: string}[]>([]);
  const sliceColor = [
    '#0000CD',
    '#4169E1',
    '#6495ED',
    '#2146F3',
    '#00BFFF',
    '#87CEFA',
    '#2176F3',
    '#2186F3',
    '#2196F3',
    '#1E90FF',
    '#2194F3',
    '#0000FF',
  ];
  useEffect(() => {
    setSeriesNumbers(
      series.map(item => {
        return item.amount;
      }),
    );
    setNames(
      series.map((item, index) => {
        return {name: item.name, color: sliceColor[index]};
      }),
    );
  }, [series]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.dictionaryContainer}>
        {names.map((item, index) => {
          return (
            <View style={styles.nameColorContainer} key={index}>
              <Text style={{color: 'black', marginRight: 5}}>{item.name}</Text>
              <View
                style={{
                  backgroundColor: item.color,
                  height: 10,
                  width: 10,
                  marginTop: 3,
                }}
              />
            </View>
          );
        })}
      </View>
      <PieChart
        widthAndHeight={250}
        series={seriesNumbers}
        sliceColor={sliceColor}
        doughnut={doughnut}
        coverRadius={0.4}
        coverFill={'#FFF'}
      />
    </View>
  );
};

export default StatisticsPie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25,
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontFamily: fonts.bold,
  },
  nameColorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  dictionaryContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 5,
    flexWrap: 'wrap',
  },
});
