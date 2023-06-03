global.Buffer = require('buffer').Buffer;
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, ScrollView, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import CustomDropdown from '../components/CustomDropdown';
import CustomInput from '../components/CustomInput';
import CustomLoader from '../components/CustomLoader';
import CustomRadioButton from '../components/CustomRadioButton';
import {COLORS, DropDownColors} from '../const/Colors';
import zipCode from '../const/ZipCode';
import {ValidateBirthday} from '../validation/Validation';

const initialState = {
  Name: '',
  Email: '',
  Mobile: '',
  DOB: '',
  Gender: '',
  Zip: '',
  City: '',
  State: '',
};

const Form = () => {
  const [inputs, setInput] = useState(initialState);
  const [selectedColor, setSelectedColor] = useState();
  const [count, setCount] = useState({submit: 0, show: 0});
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);
  const [isLiked, setIsLiked] = useState([
    {id: 1, value: 'Male', name: 'Male', selected: true},
    {id: 2, value: 'Female', name: 'Female', selected: false},
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputs.Zip.length >= 3) {
      const add = zipCode.zipcode_data.filter(function (x) {
        return x.zipcode.toLowerCase().includes(inputs.Zip.toLowerCase());
      });
      if (add.length == 1) {
        setInput(prevState => ({
          ...prevState,
          Zip: add[0].zipcode,
        }));
        setInput(prevState => ({...prevState, City: add[0].city}));
        setInput(prevState => ({...prevState, State: add[0].state}));
      }
    } else if (inputs.Zip.length == 0) {
      setInput(prevState => ({
        ...prevState,
        Zip: '',
      }));
      setInput(prevState => ({...prevState, City: ''}));
      setInput(prevState => ({...prevState, State: ''}));
    }
  }, [inputs.Zip]);

  useEffect(() => {
    if (inputs.DOB.length == 2) {
      setInput(prevState => ({...prevState, DOB: `${inputs.DOB}-`}));
    } else if (inputs.DOB.length == 5) {
      setInput(prevState => ({...prevState, DOB: `${inputs.DOB}-`}));
    }
  }, [inputs.DOB]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      let v = Object.values(errors).every(value => value === null);
      setValid(v);
    }
  }, [errors]);

  const handleValidation = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let mobExp = /^(0|91)?[6-9][0-9]{9}$/;
    let pin = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;

    try {
      for (const property in inputs) {
        if (
          property !== 'Gender' &&
          property !== 'City' &&
          property !== 'State' &&
          !inputs[property]
        ) {
          handleError(`Please Enter ${property}`, `${property}`);
          break;
        } else if (!reg.test(inputs.Email)) {
          handleError('Please Enter Valid Email', 'Email');
        } else if (!mobExp.test(inputs.Mobile)) {
          handleError('Please Enter Valid Mobile Number', 'Mobile');
        } else if (!ValidateBirthday(inputs.DOB)) {
          handleError('Please Enter Valid Date / Format DD-MM-YYYY', 'DOB');
        } else if (!pin.test(inputs.Zip)) {
          handleError('Please Enter Valid Pincode', 'Zip');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSelect = item => {
    setSelectedColor(item);
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const onRadioBtnClick = item => {
    let updatedState = isLiked.map(isLikedItem =>
      isLikedItem.id === item.id
        ? {...isLikedItem, selected: true}
        : {...isLikedItem, selected: false},
    );
    setIsLiked(updatedState);

    const gen = updatedState.filter(item => item.selected == true);
    setInput(prevState => ({...prevState, Gender: gen[0].value}));
  };

  const handleOnChange = (text, input) => {
    setInput(prevState => ({...prevState, [input]: text}));
  };

  const handleZip = text => {
    setInput(prevState => ({
      ...prevState,
      Zip: text.toLowerCase(),
    }));
  };

  const handleDOB = text => {
    setInput(prevState => ({...prevState, DOB: text}));
  };

  const submitData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        const json = JSON.stringify(inputs);
        const result = Buffer.from(json).toString('base64');
        AsyncStorage.setItem('user', JSON.stringify(inputs));
        Alert.alert('Encoded Data', result);
        setCount(prevState => ({...prevState, submit: count.submit + 1}));
      } catch (e) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 2000);
  };

  const showData = async () => {
    setCount(prevState => ({...prevState, show: count.show + 1}));
  };

  const resetData = async () => {
    try {
      await AsyncStorage.clear();
      setInput(initialState);
      setCount(prevState => ({...prevState, submit: 0}));
      setCount(prevState => ({...prevState, show: 0}));
      setValid(false);
    } catch (e) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <SafeAreaView
      style={{backgroundColor: COLORS.white, flex: 1}}
      onStartShouldSetResponder={() => handleValidation()}>
      <CustomLoader visible={loading} />
      <ScrollView
        contentContainerStyle={{paddingTop: 20}}
        nestedScrollEnabled={true}>
        <CustomInput
          label="Name"
          onChangeText={text => handleOnChange(text, 'Name')}
          error={errors.Name}
          onFocus={() => {
            handleValidation();
            handleError(null, 'Name');
          }}
          value={inputs.Name}
          labelColor={selectedColor}
        />
        <CustomInput
          label="Email"
          type="email-address"
          onChangeText={text => handleOnChange(text, 'Email')}
          error={errors.Email}
          onFocus={() => {
            handleValidation();
            handleError(null, 'Email');
          }}
          value={inputs.Email}
          labelColor={selectedColor}
        />
        <CustomInput
          label="Mobile"
          type="phone-pad"
          onChangeText={text => handleOnChange(text, 'Mobile')}
          error={errors.Mobile}
          onFocus={() => {
            handleValidation();
            handleError(null, 'Mobile');
          }}
          value={inputs.Mobile}
          labelColor={selectedColor}
        />
        <CustomInput
          label="DOB"
          placeholder="DD-MM-YYYY"
          onChangeText={text => handleDOB(text)}
          value={inputs.DOB}
          error={errors.DOB}
          onFocus={() => {
            handleValidation();
            handleError(null, 'DOB');
          }}
          labelColor={selectedColor}
          maxLength={10}
        />
        <CustomRadioButton
          isLiked={isLiked}
          onPress={onRadioBtnClick}
          label="Gender"
          error={errors.Gender}
          labelColor={selectedColor}
        />
        <CustomInput
          label="Zip Code"
          onChangeText={text => handleZip(text)}
          value={inputs.Zip}
          error={errors.Zip}
          onFocus={() => {
            handleValidation();
            handleError(null, 'Zip');
          }}
          labelColor={selectedColor}
        />
        <CustomInput
          label="City"
          editable={false}
          value={inputs.City}
          labelColor={selectedColor}
        />
        <CustomInput
          label="State"
          editable={false}
          value={inputs.State}
          labelColor={selectedColor}
        />
        <CustomDropdown
          data={DropDownColors}
          onSelect={onSelect}
          value={selectedColor}
        />
        {count.show > 0 && (
          <CustomInput
            multiline={true}
            value={`${
              JSON.stringify(inputs) + '\n\nClicked ' + count.show + ' times'
            }`}
          />
        )}
        <View style={styles.buttonWrapper}>
          <CustomButton
            text="SUBMIT"
            onPress={() => submitData()}
            disabled={count.submit > 0 || !valid ? true : false}
          />
          <CustomButton
            text="SHOW"
            onPress={() => showData()}
            disabled={count.submit > 0 ? false : true}
          />
          <CustomButton
            text="RESET"
            onPress={() => resetData()}
            disabled={count.submit > 0 ? false : true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Form;

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 30,
  },
});
