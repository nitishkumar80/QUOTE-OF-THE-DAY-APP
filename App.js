
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import FavoritesScreen from './component/Pages/FavoritesScreen';
import Screen from './component/Pages/Screen';
import HomeScreen from './component/Pages/HomeScreen';


const Stack = createStackNavigator();



// Main App component
export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true); // State variable to control onboarding screen

  // Check if onboarding has been completed
  useEffect(() => {
    // Example logic to check if onboarding has been completed
    const onboardingCompleted = false; // Change this to true if onboarding has been completed
    setShowOnboarding(!onboardingCompleted);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showOnboarding ? (
          <Stack.Screen name="Screen" component={Screen} options={{ headerShown: false }}/>
        ) : (
          <Stack.Screen name="MainStack" component={MainStack} options={{ headerShown: false }} />
        )}
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
     
    </NavigationContainer>
  );
}


