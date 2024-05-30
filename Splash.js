import React from 'react';
import {
  View,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';

import style from './Styles';
import COLORS from './Colors'
const Splash = ({navigation}) => {

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{flex: 1}}
        source={require('./assets/onboardImagee.jpg')}>
        <View style={style.details}>
        <Text style={{color: COLORS.white, fontSize: 35, fontWeight: 'bold'}}>
            Welcome
        </Text>
        <Text style={{color: COLORS.white, fontSize: 35, fontWeight: 'bold'}}>
        to Delicious Dining

        </Text>
        <Text style={{color: COLORS.white, lineHeight: 25, marginTop: 15, fontSize: 17}}>
        Hungry for adventure? Explore mouthwatering meals from across the globe with our app!
        </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Main')}>
            <View style={style.btn}>
              <Text style={{fontWeight: 'bold'}}>Get Started</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};



export default Splash;