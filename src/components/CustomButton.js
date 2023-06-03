import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../const/Colors';

const CustomButton = ({text, onPress, disabled}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View
        style={[
          styles.btnContainerStyle,
          disabled ? styles.inactiveButton : styles.activeButton,
        ]}>
        <Text
          style={[
            styles.btnTextStyle,
            disabled ? styles.inactiveText : styles.activeText,
          ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    width: 100,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: COLORS.speechBlue,
  },
  inactiveButton: {
    backgroundColor: COLORS.lightGray,
  },
  activeText: {
    color: COLORS.white,
  },
  inactiveText: {
    color: COLORS.gray,
  },
  btnTextStyle: {
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
  },
});

export default CustomButton;
