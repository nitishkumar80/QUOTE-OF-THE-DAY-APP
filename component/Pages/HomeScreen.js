import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Share } from 'react-native';
import axios from 'axios';

const colors = ['#FF5733', '#33FF57', '#337AFF', '#E833FF', '#FFE333']; // Array of background colors

export default function HomeScreen({ navigation }) {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [favorites, setFavorites] = useState([]); // State variable for favorites

  useEffect(() => {
    fetchRandomQuote(); // Fetch quote initially
    const intervalId = setInterval(fetchRandomQuote, 10000); // Fetch a new quote every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get('https://api.breakingbadquotes.xyz/v1/quotes');
      const { quote, author } = response.data[0];
      setQuote(quote);
      setAuthor(author);
      // Randomly select a color from the colors array
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setBackgroundColor(randomColor);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const shareQuote = async () => {
    try {
      const result = await Share.share({
        message: `"${quote}" - ${author}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared successfully');
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing quote:', error);
    }
  };

  const saveToFavorites = () => {
    const newFavorite = { quote, author };
    setFavorites([...favorites, newFavorite]);
    navigation.navigate('Favorites', { favorites: [...favorites, newFavorite] });
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>"{quote}"</Text>
      </View>
      <View style={styles.authorContainer}>
        <Text style={styles.authorText}>- {author}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Share" onPress={shareQuote} color="#007bff" />
        <Button title="Save to Favorites" onPress={saveToFavorites} color="#28a745" />
      </View>
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
  quoteContainer: {
    padding: 10,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: 'black',
    
   
  },
  quoteText: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'white',
  },
  authorContainer: {
    marginVertical: 10,
  },
  authorText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});
