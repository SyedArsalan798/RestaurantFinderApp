import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapboxGL from '@rnmapbox/maps';
import SearchBox from './SearchBox';
import RestaurantCard from './RestaurantCard';
import { Ionicons } from "@expo/vector-icons";

MapboxGL.setAccessToken("MAPBOX_PUBLIC_KEY");

const MapWithSearch = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([])
  const [scrollEnabled, setScrollEnabled] = useState(true); // state to control ScrollView's scrollability
  const [isLoading, setIsLoading] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(()=>{
    loadProfilePic();
  }, [])

  const loadProfilePic = async () => {
    try {
        const profilePicUri = await AsyncStorage.getItem('profilePicUri');
        if (profilePicUri) {
            setSelectedImage(profilePicUri);
        }
    } catch (error) {
        console.error('Failed to load profile pic:', error);
    }
};

  const handleSelectRestaurants = (restaurants) => {
    setRestaurants(restaurants);
  };

  const enableScroll = () => {
    setScrollEnabled(true);
  };

  const disableScroll = () => {
    setScrollEnabled(false);
  };

  return (
    <View>
      <SearchBox navigation={navigation} onSelectLocations={handleSelectRestaurants} setIsLoading={setIsLoading} selectedImage={selectedImage}/>    
      <ScrollView style={{marginBottom: 110}} scrollEnabled={scrollEnabled}>
      {isLoading===true && isLoading !== null &&
          <View style={styles.loading}>
            <ActivityIndicator size={'large'} color={"#000"} style={styles.spinner}/>
        </View>
      }
        <View>
          <MapboxGL.MapView
            style={styles.map}
            styleURL={MapboxGL.StyleURL.Street}
            zoomLevel={10}
            centerCoordinate={[0,0]}
            onMapIdle={enableScroll} // Enable scroll when region changes
            onCameraChanged={disableScroll} // Disable scroll when region changes
          >
            {restaurants.length > 0 && 
            <MapboxGL.Camera
              zoomLevel={15}
              centerCoordinate={
                [
                  restaurants[0].longitude, restaurants[0].latitude
                ]}
              animationMode="flyTo"
              animationDuration={2000}
            />
            }
            {/* Add map annotations here */}
            {restaurants?.map((restaurant, index) => (
              restaurant.longitude && restaurant.latitude &&
              <MapboxGL.PointAnnotation
                key={index}
                id={`restaurant-${index}`}
                coordinate={[restaurant.longitude, restaurant.latitude]}
              >
                <View style={styles.annotationContainer}>
                  <MapboxGL.Callout title={restaurant.name} />
                  
                </View>
              </MapboxGL.PointAnnotation>
            ))
          }

          </MapboxGL.MapView>
        </View>

        {!isLoading &&
        <View style={styles.restaurantList}>
          {restaurants?.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))}
        </View>
        }
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    height: 50,
    marginBottom: 10
  },
  spinner: {
    transform: [{ scale: 1.5 }],
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  map: {
    // flex: 1,
    height: 550,
    padding: 10,
    paddingTop: 0,
  },
  annotationContainer: {
    width: 400,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  restaurantList: {
    flex: 3,
    marginBottom: 10,
  }
});

export default MapWithSearch;
