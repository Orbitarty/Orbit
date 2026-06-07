import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import BookingsScreen from './src/screens/BookingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Theme
import { colors } from './src/constants/theme';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Explore') {
                iconName = focused ? 'compass' : 'compass-outline';
              } else if (route.name === 'Bookings') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              } else {
                iconName = 'help-outline';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.gray[500],
            tabBarStyle: {
              backgroundColor: colors.white,
              borderTopWidth: 1,
              borderTopColor: colors.gray[200],
              paddingTop: 8,
              paddingBottom: 8,
              height: 60,
            },
            headerStyle: {
              backgroundColor: colors.white,
              shadowColor: colors.gray[200],
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 1,
              shadowRadius: 3,
              elevation: 3,
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: '600',
              color: colors.gray[900],
            },
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ headerTitle: 'OrbitCity' }}
          />
          <Tab.Screen 
            name="Explore" 
            component={ExploreScreen}
            options={{ headerTitle: 'Explore Hubs' }}
          />
          <Tab.Screen 
            name="Bookings" 
            component={BookingsScreen}
            options={{ headerTitle: 'My Bookings' }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ headerTitle: 'Profile' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <Toast />
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}