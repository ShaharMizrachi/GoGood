import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {useLoginContext} from '../context/Context';
import DistanceBetweenTwoPoints from '../DistanceBetweenTwoPoints';
import {hebrew} from '../Hebrew';
import {
  GetAvailablePostByprofessionalInter,
  GettingHelp_requsts,
  PostSend,
  RootStackParamList,
} from '../Interfaces';
import IconButton from './IconButton';
import RemoveIcon from '../../assets/images/RemoveIcon';
interface IFilterItem {
  [key: string]: {
    name: string;
    selected: boolean;
  };
}
const ActionBar = ({
  myPostLocations,
  onPressMapFunc,
  setfilteredPosts,
}: {
  myPostLocations?:
    | GetAvailablePostByprofessionalInter[]
    | GettingHelp_requsts[]
    | PostSend[];
  onPressMapFunc?: any;
  setfilteredPosts?: Function;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [filterBy, setFilterBy] = useState<'' | 'dateOrLocation' | 'category'>(
    '',
  );
  const [dateOrLocation, setDateOrLocation] = useState<
    '' | 'date' | 'location'
  >('date');
  const [filteredOptions, setFileredOption] = useState<number[]>([]);
  const [filterObject, setFilterObject] = useState<IFilterItem>({});
  const {EnumProfessionsGlobal} = useLoginContext();
  const [localFilteredPosts, setLocalFilteredPosts] = useState<
    GetAvailablePostByprofessionalInter[] | GettingHelp_requsts[] | PostSend[]
  >();

  const {user} = useLoginContext();
  const buildFilterState = () => {
    const typesId = myPostLocations?.map(post => post.categoryId);
    if (typesId && typesId.length > 0) {
      const uniqueTypes = new Set(typesId);
      let array = Array.from(uniqueTypes);
      let filters: IFilterItem = {};
      array.forEach(a => {
        filters[a.toString()] = {
          name: EnumProfessionsGlobal?.find(item => a === item.id)?.he!,
          selected: false,
        };
      });
      setFilterObject(filters);
    }
  };
  useEffect(() => {
    if (myPostLocations && setfilteredPosts) {
      setLocalFilteredPosts(myPostLocations);
      setfilteredPosts([...myPostLocations]);
      buildFilterState();
    }
  }, [myPostLocations]);
  useEffect(() => {
    if (myPostLocations && setfilteredPosts) {
      const filterCategoryNumbers = getSelectedFilters();
      let posts;
      if (filterCategoryNumbers.length !== 0) {
        posts = (
          myPostLocations as GetAvailablePostByprofessionalInter[]
        )?.filter(post =>
          filterCategoryNumbers.includes(String(post.categoryId)),
        );
      } else {
        posts = myPostLocations;
      }

      setfilteredPosts(posts);
      setLocalFilteredPosts(posts);
    }
  }, [filterObject]);
  const toggleSelected = (option: number) => {
    setFilterObject(f => ({
      ...f,
      [option]: {
        ...f[option],
        selected: !f[option]?.selected,
      },
    }));
  };
  const getSelectedFilters = () => {
    return Object.entries(filterObject)
      .filter(([key, value]) => value.selected)
      .map(([key, value]) => key);
  };
  const filter = (option: number) => {
    if (option === -1) {
      buildFilterState();
      if (myPostLocations && setfilteredPosts) {
        setfilteredPosts([...myPostLocations]);
        setLocalFilteredPosts(myPostLocations);
      }
      return;
    }
    toggleSelected(option);
  };

  const sortByLocation = () => {
    setDateOrLocation('location');
    if (myPostLocations && setfilteredPosts && localFilteredPosts) {
      (localFilteredPosts as GetAvailablePostByprofessionalInter[]).sort(
        (x, y) => {
          const firstPlace = DistanceBetweenTwoPoints({
            lat1: x.latitude,
            lat2: user.lat,
            lon1: x.longitude,
            lon2: user.long,
          });
          const secendPlace = DistanceBetweenTwoPoints({
            lat1: y.latitude,
            lat2: user.lat,
            lon1: y.longitude,
            lon2: user.long,
          });
          if (firstPlace > secendPlace) return 1;
          if (secendPlace > firstPlace) return -1;
          return 0;
        },
      );

      setfilteredPosts([...localFilteredPosts]);
    }
  };

  const calculatingTime = (data: Date) => {
    return Math.floor(
      (new Date().getTime() - new Date(data).getTime()) / (1000 * 60 * 60 * 24),
    );
  };

  const sortByDate = () => {
    setDateOrLocation('date');
    if (myPostLocations && setfilteredPosts && localFilteredPosts) {
      (localFilteredPosts as GetAvailablePostByprofessionalInter[]).sort(
        (x, y) => {
          const firstPlace = calculatingTime(x.dateUpdete);
          const secendPlace = calculatingTime(y.dateUpdete);
          if (firstPlace > secendPlace) return 1;
          if (secendPlace > firstPlace) return -1;
          return 0;
        },
      );

      setfilteredPosts([...localFilteredPosts]);
    }
  };

  const closeAndFilter = (callBack: Function) => {
    setFilterBy('');
    callBack?.();
  };
  return (
    <>
      <View style={styles.actionBarContainer}>
        <View style={styles.buttonsContainer}>
          <View style={{width: '100%'}}>
            <View
              style={[styles.button, filterBy === 'category' && styles.active]}>
              <IconButton
                onPress={() => setFilterBy(f => (!f ? 'category' : ''))}
                icon={require('../../assets/images/filter.png')}
                extraStyles={styles.iconSize}
              />
            </View>
            {filterBy === 'category' && (
              <View style={styles.options}>
                <View style={styles.categoryContainer}>
                  {Object.entries(filterObject).map(option => (
                    <TouchableOpacity
                      key={option[0]}
                      style={[
                        styles.option,
                        option[1].selected && styles.activeOption,
                      ]}
                      onPress={() =>
                        closeAndFilter(() => filter(Number(option[0])))
                      }>
                      <Text style={styles.optionText}>{option[1].name}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => closeAndFilter(() => filter(-1))}>
                    <Text style={styles.optionText}>{hebrew.all}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          <View style={{width: '100%'}}>
            <View
              style={[
                styles.button,
                filterBy === 'dateOrLocation' && styles.active,
              ]}>
              <IconButton
                onPress={() => setFilterBy(f => (!f ? 'dateOrLocation' : ''))}
                icon={require('../../assets/images/sort.png')}
                extraStyles={styles.iconSize}
              />
            </View>
            {filterBy === 'dateOrLocation' && (
              <View style={styles.dateOrLocationContainer}>
                <TouchableOpacity
                  onPress={() => closeAndFilter(sortByLocation)}>
                  <View
                    style={[
                      styles.optionItem,
                      dateOrLocation === 'location' && styles.activeOptionItem,
                    ]}>
                    <Text style={styles.optionText}>
                      {hebrew.filter_by_distance}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.seperator} />
                <TouchableOpacity onPress={() => closeAndFilter(sortByDate)}>
                  <View
                    style={[
                      styles.optionItem,
                      dateOrLocation === 'date' && styles.activeOptionItem,
                    ]}>
                    <Text style={styles.optionText}>
                      {hebrew.filter_by_date}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.button}>
            <IconButton
              onPress={onPressMapFunc}
              icon={require('../../assets/images/mapIcon.png')}
              extraStyles={styles.iconSize}
            />
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.horizontal}>
          {Object.entries(filterObject).map((item, i) => {
            return (
              item[1].selected && (
                <View key={i} style={styles.listItem}>
                  <TouchableOpacity
                    style={styles.removeIcon}
                    onPress={() => toggleSelected(Number(item[0]))}>
                    <RemoveIcon />
                  </TouchableOpacity>
                  <Text style={styles.optionText}>{item[1].name}</Text>
                </View>
              )
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

export default ActionBar;

const styles = StyleSheet.create({
  horizontal: {direction: 'rtl', zIndex: -1},
  listItem: {
    backgroundColor: 'white',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    minWidth: 100,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
    padding: 5,
  },
  removeIcon: {justifyContent: 'center'},

  actionBarContainer: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    backgroundColor: colors.gray500,
    zIndex: 150,
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '15%',
  },
  button: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: 'white',
    zIndex: 1555,
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  iconSize: {
    width: 22,
    height: 27,
  },

  optionText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
  },
  options: {
    position: 'absolute',
    top: 46,
    left: 0,
    width: Dimensions.get('screen').width * 0.9,
  },
  dateOrLocationContainer: {
    position: 'absolute',
    top: 46,
    backgroundColor: 'white',
    left: 0,
    width: 150,
    elevation: 10,
    borderRadius: 15,
    padding: 10,
    borderTopLeftRadius: 0,
  },
  optionContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  optionItem: {
    minWidth: '25%',
    height: 40,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  activeOptionItem: {backgroundColor: '#EBF3FB'},
  seperator: {
    height: 2,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#EFF4FC',
  },
  optionItemActive: {
    backgroundColor: '#ecf3fb',
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 10,
    borderTopLeftRadius: 0,
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  option: {
    minWidth: 90,
    height: 50,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B9CCE7',
    borderRadius: 25,
  },
  activeOption: {
    backgroundColor: '#69D7C7',
    elevation: 10,
  },
});
