import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const SearchBox = ({ navigation, onSelectLocations, setIsLoading, selectedImage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  // const [selectedImage, setSelectedImage] = useState(null);


  useEffect(()=>{
    setSearchQuery('');
  }, [])



  useEffect(() => {
    if (searchQuery.length > 2) {
      fetchRestaurantsInBoundary();
    } else {
      setSearchResults([]);
      setRestaurants([]);
    }
  }, [searchQuery]);

  useEffect(()=>{

    onSelectLocations(restaurants)

  }, [restaurants])

  const fetchRestaurantsInBoundary = async () => {
    try {

      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?proximity=ip&access_token=<MAPBOX_PUBLIC_KEY>`);
    
      const data = response.data;

      if (data && data.features && data.features.length > 0) {
        const locations = data.features.map(feature => ({
          name: feature.place_name,
          coordinates: feature.center,
          bbox: feature.bbox
        }));
  
        setSearchResults(locations);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleLocationPress = async (item) => {
    try {
      setSearchResults([]);
      setIsLoading(true);
      if (item.bbox) {
        const response = await axios.get('https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary', {
          params: {
            bl_latitude: item.bbox[1],
            tr_latitude: item.bbox[3],
            bl_longitude: item.bbox[0],
            tr_longitude: item.bbox[2],
            limit: '15',
            restaurant_tagcategory_standalone: '10591',
            restaurant_tagcategory: '10591',
            lunit: 'km',
            lang: 'en_US'
          },
          headers: {
            'X-RapidAPI-Key': 'YOUR_API_KEY',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }
        });
        setRestaurants(response.data.data);
      } else {
        const response = await axios.get('https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng', {
          params: {
            latitude: item.coordinates[1],
            longitude: item.coordinates[0],
            limit: '5',
          },
          headers: {
            'X-RapidAPI-Key': 'YOUR_API_KEY',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }
        });
        setRestaurants(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
    finally{
      setIsLoading(false)
    }
  };



  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.input}
          placeholder="Search for a location"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Profile')} style={styles.profileContainer}>
        {!selectedImage ?
        <Image
            source={require('./assets/onboardImagee.jpg')}
            style={styles.profileImage}
          />
          :
          <Image
          source={{ uri: selectedImage }}
          style={styles.profileImage}
        />
          }
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.autocompleteContainer}
        data={searchResults}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleLocationPress(item)}>
            <Text style={styles.autocompleteItem}>
              {item.name} (
              {item.bbox && <Text>{item.bbox.join(', ')}</Text>}
              )
            </Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    marginTop: 40
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '85%'
  },
  autocompleteContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  autocompleteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileContainer: {
    marginLeft: 15,
    width: '15%'
    // borderColor: 'grey',
    // borderWidth: 2,

  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderColor: 'grey',
    borderWidth: 1,
  },
});

export default SearchBox;