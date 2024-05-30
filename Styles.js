import { StyleSheet } from 'react-native';
import COLORS from './Colors';
const style = StyleSheet.create({
    maincontainer: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: COLORS.light
    },
    details: {
      height: '40%',
      bottom: 0,
      position: 'absolute',
      paddingLeft: 40,
      paddingRight: 30
    },
    btn: {
      height: 50,
      width: '100%',
      backgroundColor: COLORS.white,
      marginTop: 20,
      borderRadius: 7,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainbtn: {
      height: 50,
      backgroundColor: COLORS.grey,
      paddingHorizontal: 30,
      margin: 10,
      // marginTop: 20,
      borderRadius: 7,
      borderColor: 'grey',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileText: {
      paddingVertical: 50,
      paddingHorizontal: 50
    }
  });


  export default style;