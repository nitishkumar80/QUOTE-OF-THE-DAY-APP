// import { StyleSheet, Text, View, Button, Share } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function HomeScreen() {
//   const [quote, setQuote] = useState('');
//   const [author, setAuthor] = useState('');

//   useEffect(() => {
//     fetchRandomQuote();
//     const interval = setInterval(fetchRandomQuote, 10000); // Fetch a new quote every 10 seconds
//     return () => clearInterval(interval); // Clean up the interval
//   }, []);

//   const fetchRandomQuote = async () => {
//     const apiUrl = 'https://api.breakingbadquotes.xyz/v1/quotes';
  
//     try {
//       const response = await axios.get(apiUrl);
//       console.log('Response data:', response.data); // Add this line to log response data
//       if (response.data && response.data.length > 0) {
//         const randomIndex = Math.floor(Math.random() * response.data.length);
//         setQuote(response.data[randomIndex].quote);
//         setAuthor(response.data[randomIndex].author);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
  

//   const shareQuote = async () => {
//     try {
//       const result = await Share.share({
//         message: `"${quote}" - ${author}`,
//       });
//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // Shared successfully
//         } else {
//           // Shared successfully
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // Share dismissed
//       }
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const saveToFavorites = () => {
//     // Implement saving to favorites logic here
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.quote}>"{quote}"</Text>
//       <Text style={styles.author}>- {author}</Text>
//       <View style={styles.buttonContainer}>
//         <Button title="Share" onPress={shareQuote} color="#007bff" />
//         <Button title="Save to Favorites" onPress={saveToFavorites} color="#28a745" />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   quote: {
//     fontSize: 20,
//     fontStyle: 'italic',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   author: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: 20,
//   },
// });







// HomeScreen.js
// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Share } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchRandomQuote(); // Fetch quote initially
    const intervalId = setInterval(fetchRandomQuote, 10000); // Fetch a new quote every 30 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get('https://api.breakingbadquotes.xyz/v1/quotes');
      const { quote, author } = response.data[0];
      setQuote(quote);
      setAuthor(author);
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
    // Pass updated favorites array to the Favorites tab
    navigation.navigate('Favorites', { favorites: [...favorites, newFavorite] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.quote}>"{quote}"</Text>
      <Text style={styles.author}>- {author}</Text>
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
  quote: {
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  author: {
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


