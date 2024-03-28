
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './component/Pages/HomeScreen';
import FavoritesScreen from './component/Pages/FavoritesScreen';

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;
//             if (route.name === 'Home') {
//               iconName = 'home';
//             } else if (route.name === 'Favorites') {
//               iconName = 'favorite';
//             }
//             return <MaterialIcons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: 'blue',
//           inactiveTintColor: 'gray',
         
//         }}
//       >
//         <Tab.Screen name="Home" component={HomeScreen}    options={{ headerShown: false }}/>
//         <Tab.Screen name="Favorites" component={FavoritesScreen} 
//                   options={{ headerShown: false }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }





// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function App() {
  const [favorites, setFavorites] = React.useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Favorites') {
              iconName = 'favorite';
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} initialParams={{ favorites }} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
