import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {COLORS} from '../const/Colors';

const CustomInput = ({
  label,
  error,
  onFocus = () => {},
  onChangeText,
  type,
  placeholder,
  editable,
  value,
  labelColor,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{marginBottom: 20}}>
      <Text
        style={[
          styles.label,
          {color: labelColor ? labelColor.value : COLORS.gray},
        ]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? COLORS.error
              : isFocused
              ? COLORS.focus
              : COLORS.black,
          },
        ]}>
        <TextInput
          style={{color: '#333', height: 45}}
          placeholder={placeholder}
          placeholderTextColor={'#333'}
          onChangeText={onChangeText}
          keyboardType={type}
          editable={editable}
          value={value}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  label: {
    marginHorizontal: 10,
    marginVertical: 5,
    fontSize: 14,
  },
  errorText: {
    marginHorizontal: 10,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.error,
  },
  inputContainer: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});
