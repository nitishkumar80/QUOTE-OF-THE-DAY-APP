import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Share, Alert } from 'react-native';
import axios from 'axios';

import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome icons
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from expo-linear-gradient

const colors = ['#FF5733', '#33FF57', '#337AFF', '#E833FF', '#FFE333']; // Array of background colors

export default function HomeScreen({ navigation }) {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [favorites, setFavorites] = useState([]); // State variable for favorites
  
  const [saved, setSaved] = useState(false); // State variable to track if the quote is saved

  useEffect(() => {
    fetchRandomQuote(); // Fetch quote initially
    const intervalId = setInterval(fetchRandomQuote, 10000); // Fetch a new quote every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get('https://type.fit/api/quotes');
      const { text, author } = response.data[Math.floor(Math.random() * response.data.length)];
      setQuote(text);
      setAuthor(author);
      setSaved(false);
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
    // Optimistically update the UI
    setFavorites([...favorites, newFavorite]);
    setSaved(true); // Set the saved state to true
    // Show an alert when the quote is saved
    Alert.alert('Added to Favorites');
  };

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Handler for navigating to the Favorites screen
  const navigateToFavorites = () => {
    navigation.navigate('FavoritesScreen', { favorites });
  };

  return (
    <View style={styles.background}>
      <LinearGradient colors={['#FFB702', '#0A4E95']} style={styles.background}>
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>"{quote}"</Text>
          <View style={styles.authorContainer}>
            <Text style={styles.authorText}>- {author}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Icon.Button name="share" backgroundColor="#FFB702" onPress={shareQuote} 
         >
          Share
          </Icon.Button>
          {/* Conditional rendering based on the saved state */}
          <Icon.Button name="heart" backgroundColor="red" onPress={saveToFavorites} >

          </Icon.Button>
          {/* Button to navigate to Favorites screen */}
          <Icon.Button name="star" backgroundColor="#FFB702" onPress={navigateToFavorites} >
Fav
          </Icon.Button>
        </View>
        <Text style={styles.Footer}>
        © Nitish Mehta - 2024


        </Text>
      </LinearGradient>
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
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteContainer: {
    padding: 10,
    marginVertical: 10,
    shadowColor: 'black',
    borderRadius: 9,
    width: '95%',
    height: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    shadowRadius: 7,
    textAlignVertical: 'top',
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'black',
    
  },
  authorContainer: {
    marginVertical: 10,
    padding: 10,
  },
  authorText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 70,
  },
  Footer:{
position:"relative",
top:150,
color:'white',
fontWeight:'500',
  },
});
