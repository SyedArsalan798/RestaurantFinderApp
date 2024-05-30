import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RestaurantCard = ({ restaurant }) => {
  const handlePress = (url) => {
    Linking.openURL(url);
  };
  return (
    restaurant.name && (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          {restaurant && restaurant.photo && restaurant.photo.images && restaurant.photo.images.large ? (
            <Image source={{ uri: restaurant.photo.images.large.url }} style={styles.image} />
          ) : (
            <Text>Picture Not Available</Text>
          )}
        </View>
        <Text style={styles.title}>{restaurant.name}</Text>
        <View style={styles.row}>
          <Ionicons name="star" size={18} color="black" />
          <Text style={styles.subtitle}>{restaurant.rating} ({restaurant.num_reviews} Reviews)</Text>
        </View>
        <View style={styles.subtitleRow}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.subtitle}>{restaurant.price ? restaurant.price : "Not Available"}</Text>
        </View>
        <View style={styles.subtitleRow}>
          <Text style={styles.label}>Ranking:</Text>
          <Text style={styles.subtitle}>{restaurant.ranking || "Not Available"}</Text>
        </View>
        <View style={styles.subtitleRow}>
          <View style={styles.pillsContainer}>
            {restaurant?.cuisine?.map((cuisine, index) => (
              <Text key={index} style={styles.pill}>{cuisine.name}</Text>
            ))}
          </View>
        </View>
        <View style={styles.addressContainer}>
          <Ionicons name="location" size={24} color="black" />
          <Text style={styles.address}>{restaurant.address}</Text>
        </View>
        {restaurant.email && (
          <TouchableOpacity activeOpacity={0.8} style={styles.contact} onPress={() => handlePress(`mailto:${restaurant.email}`)}>
            <Ionicons name="mail" size={24} color="black" />
            <Text style={styles.contactText}>{restaurant.email}</Text>
          </TouchableOpacity>
        )}
        {restaurant.phone && (
          <TouchableOpacity activeOpacity={0.8} style={styles.contact} onPress={() => handlePress(`tel:${restaurant.phone}`)}>
            <Ionicons name="call" size={24} color="black" />
            <Text style={styles.contactText}>{restaurant.phone}</Text>
          </TouchableOpacity>
        )}
        {restaurant.website ? (
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => handlePress(restaurant.website)}>
          <Ionicons name="open-outline" size={20} color="black" />
          <Text style={styles.buttonText}>View Menu</Text>
        </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => handlePress(restaurant.web_url)}>
            <Ionicons name="open-outline" size={20} color="black" />
            <Text style={styles.buttonText}>View Menu</Text>
          </TouchableOpacity>
        )}

      </View>
    )
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderColor: '#ccc',
    borderWidth: 1,
  },
  imageContainer: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    width: 300
  },
  row: {
    flexDirection: 'row',
    alignItems: 'end',
    gap: 5,
  },
  button: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    borderColor: '#eee',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  contactText: {
    marginLeft: 5,
    color: '#333',
    textDecorationLine: 'underline'
  },
  addressContainer: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 10,
  },
  subtitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 5,
    width: 'auto',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  pill: {
    backgroundColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  }
});

export default RestaurantCard;
