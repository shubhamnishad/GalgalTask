import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS} from '../const/Colors';

const CustomDropdown = ({data, value, onSelect = () => {}}) => {
  const col = Object.entries(data).map(([key, value]) => ({key, value}));
  const [showOptions, setShowOptions] = useState(false);

  const onSelectedItem = val => {
    setShowOptions(false);
    onSelect(val);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.dropDownStyle}
        onPress={() => setShowOptions(!showOptions)}>
        <Text>{!!value ? value.key : 'Choose Color'}</Text>
        <Text
          style={[
            styles.icon,
            {transform: [{rotate: showOptions ? '180deg' : '0deg'}]},
          ]}>
          V
        </Text>
      </TouchableOpacity>
      {showOptions && (
        <View style={{maxHeight: 120}}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}>
            {col.map((val, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => onSelectedItem(val)}
                  style={styles.dropdownPick}>
                  <View>
                    <Text style={styles.dropDownTextColor}>{val.key}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  dropDownStyle: {
    padding: 5,
    minHeight: 48,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
  },
  icon: {
    fontWeight: 'bold',
    marginRight: 10,
    color: COLORS.black,
  },
  dropdownPick: {
    padding: 5,
    borderBottomWidth: 1,
    height: 40,
    borderTop: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownTextColor: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '600',
  },
});
