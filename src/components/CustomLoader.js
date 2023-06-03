import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../const/Colors';

const CustomLoader = ({visible}) => {
  const {height, width} = useWindowDimensions();
  return (
    visible && (
      <View style={[styles.container, {height, width}]}>
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} color={COLORS.speechBlue} />
          <Text style={{marginRight: 10, fontSize: 16}}>Loading...</Text>
        </View>
      </View>
    )
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  loader: {
    height: 70,
    backgroundColor: COLORS.white,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
