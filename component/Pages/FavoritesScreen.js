import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FavoritesScreen({ route }) {
  const { favorites } = route.params;

  return (
    <LinearGradient colors={['#FFB702', '#0A4E95']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {favorites.length > 0 ? (
          favorites.map((item, index) => (
            <View key={index} style={styles.favoriteItem}>
              <Text style={styles.quote}>"{item.quote}"</Text>
              <Text style={styles.author}>- {item.author}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noFavoritesText}>You have no favorites yet!</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  favoriteItem: {
    marginBottom: 20,
    borderRadius: 9,
    width: '85%',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  quote: {
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 5,
    textAlign: 'center',
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noFavoritesText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
