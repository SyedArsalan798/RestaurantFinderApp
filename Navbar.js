// import React, {useEffect, useState} from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
// import COLORS from './Colors';

// const Navbar = ({navigation, onSearch, profilePicUri }) => {
//   const [searchLoc, setSearchedLoc] = useState('')
//   useEffect(() =>{
//     onSearch(searchLoc);
//   }, [searchLoc])

//   return (
//     <View style={styles.navbar}>
//       {/* Left side: Logo */}
//       <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Home')}>
//       {/* <Image
//         source={require('./assets/onboardImagee.jpg')}
//         style={styles.logo}
//       /> */}
//       <Text style={{fontWeight: 'bold', fontSize: 19, color: 'blue'}}>foodie</Text>
//       </TouchableOpacity>

//       {/* Center: Search input */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           value={searchLoc}
//           placeholder="Search by Location"
//           style={styles.searchInput}
//           placeholderTextColor="#888"
//           onChangeText={(text) => setSearchedLoc(text)}
//         />
//       </View>

//       {/* Right side: Circular profile */}
    //   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Profile')} style={styles.profileContainer}>
    //   {!profilePicUri ?
    //   <Image
    //       source={require('./assets/onboardImagee.jpg')}
    //       style={styles.profileImage}
    //     />
    //     :
    //     <Image
    //     source={{ uri: profilePicUri }}
    //     style={styles.profileImage}
    //   />
    //     }

    //   </TouchableOpacity>
//     </View>
//   );
// };

// const styles = {
//   navbar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: COLORS.light,
//     marginTop: 40,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: 'grey',
//   },
//   logo: {
//     width: 30,
//     height: 30,
//   },
//   searchContainer: {
//     flex: 1,
//     marginLeft: 10,
//     marginRight: -5,
//   },
//   searchInput: {
//     borderWidth: 1,
//     borderColor: 'grey',
//     borderRadius: 7,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     fontSize: 16,
//     color: COLORS.dark,
//   },
//   profileContainer: {
//     marginLeft: 15,
//     // borderColor: 'grey',
//     // borderWidth: 2,

//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 25,
//     borderColor: 'grey',
//     borderWidth: 1,
//   },
// };

// export default Navbar;
