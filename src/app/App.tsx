import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import PantryPage from './screens/PantryPage';
import ToBuyPage from './screens/ToBuyPage';
import NotificationsPage from './screens/NotificationsPage';
import ProfilePage from './screens/ProfilePage';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            // Use specific icon names for each route
            if (route.name === 'Pantry') {
              return <MaterialIcons name="kitchen" size={size} color={color} />;
            } else if (route.name === 'To Buy') {
              return <MaterialIcons name="shopping-cart" size={size} color={color} />;
            } else if (route.name === 'Notifications') {
              return <MaterialIcons name="notifications" size={size} color={color} />;
            } else if (route.name === 'Profile') {
              return <MaterialIcons name="person" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Pantry" component={PantryPage} />
        <Tab.Screen name="To Buy" component={ToBuyPage} />
        <Tab.Screen name="Notifications" component={NotificationsPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
