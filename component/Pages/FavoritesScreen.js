import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function FavoritesScreen({ route }) {
  const { favorites } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Favorites</Text>
      {favorites.map((favorite, index) => (
        <View key={index} style={styles.quoteContainer}>
          <Text style={styles.quote}>"{favorite.quote}"</Text>
          <Text style={styles.author}>- {favorite.author}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  quoteContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
