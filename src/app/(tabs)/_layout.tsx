import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://chaqabahar.us-east-a.ibm.stepzen.net/api/laughing-mongoose/__graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      'apikey chaqabahar::local.net+1000::3530f1a38f5228920460fa94780ce2e9ac651f3da07a9738ee24e2dda78cdff0',
  },
});

const RootLayout = () => {
  return (
    <ApolloProvider client={client}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* 1. Home Screen */}
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        {/* 2. Grocery List Screen */}
        <Tabs.Screen
          name="grocery"
          options={{
            tabBarLabel: 'Grocery List',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list-outline" color={color} size={size} />
            ),
          }}
        />
        {/* 3. Add Food Screen */}
        <Tabs.Screen
          name="search"
          options={{
            tabBarLabel: 'Add Food',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" color={color} size={size} />
            ),
          }}
        />
        {/* 4. Notifications Screen */}
        <Tabs.Screen
          name="notifs"
          options={{
            tabBarLabel: 'Notifications',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="notifications-outline" color={color} size={size} />
            ),
          }}
        />
        {/* 5. Profile Screen */}
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </ApolloProvider>
  );
};

export default RootLayout;
