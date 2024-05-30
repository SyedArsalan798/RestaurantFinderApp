import { StyleSheet } from 'react-native';
import Splash from './Splash';
import React from 'react';
import BootSplash from "react-native-bootsplash";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// import Main from './Main';
import Profile from './Profile';
import MapWithSearch from './MapWithSearch';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function App() {
  // useEffect(() => {
  //   const init = async () => {
  //     // …do multiple sync or async tasks
  //   };

  //   init().finally(async () => {
  //     await BootSplash.hide({ fade: true });
  //     console.log("BootSplash has been hidden successfully");
  //   });
  // }, []);
  
  return (
    <NavigationContainer onReady={() => {
      BootSplash.hide({ fade: true })
      }
    }>
        <Tab.Navigator screenOptions={({route}) => ({
          tabBarStyle: {
              paddingBottom: 3,
            }, 
              tabBarInactiveTintColor: 'grey',
              tabBarActiveTintColor: 'black', 
              headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search Map') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // Return the Ionicons component with the appropriate name and color
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}>
          
          <Tab.Screen name="Home" component={Splash}   options={{
            tabBarStyle: { display: 'none' }, tabBarItemStyle: {
              display: 'block',
            },
          }} />

        <Tab.Screen name="Search Map" component={MapWithSearch}>
        </Tab.Screen>
        <Tab.Screen name="Profile" component={Profile}>
          {/* {() => <Profile />} */}
        </Tab.Screen>
        </Tab.Navigator>


      
      
    </NavigationContainer> 
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;
