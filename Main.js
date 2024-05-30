import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
// import COLORS from './Colors';
import styles from './Styles';
// import Navbar from './Navbar';
// import Places from './Places';
// import { ScrollView } from 'react-native-gesture-handler';
// import Mapp from './Mapp';
function Main({ navigation, profilePicUri }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      {/* <Navbar navigation={navigation} onSearch={handleSearch} profilePicUri={profilePicUri} /> */}
      <ScrollView style={styles.maincontainer}>
        {/* <Places searchTerm={searchTerm} /> */}
        <Text style={{marginTop: 100}}>Welcome to the Main Page</Text>
      </ScrollView>
    </>
  );
}

export default Main;
