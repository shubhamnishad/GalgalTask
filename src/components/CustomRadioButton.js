import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../const/Colors';

const CustomRadioButton = ({
  isLiked,
  onPress = () => {},
  label,
  labelColor,
}) => {
  return (
    <View style={styles.radioButtonWrapper}>
      <Text
        style={[
          styles.label,
          {color: labelColor ? labelColor.value : COLORS.gray},
        ]}>
        {label}
      </Text>

      <View style={styles.radioButtonContainer}>
        {isLiked.map((item, index) => (
          <View style={{flexDirection: 'row'}} key={index}>
            <TouchableOpacity
              key={index}
              onPress={() => onPress(item)}
              style={styles.radioButton}>
              {item.selected ? <View style={styles.radioButtonIcon} /> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPress(item)}>
              <Text style={styles.radioButtonText}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
  radioButtonWrapper: {
    marginHorizontal: 12,
    marginVertical: 10,
    paddingBottom: 5,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 45,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: COLORS.speechBlue,
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 25,
  },
});
