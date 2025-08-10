import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Onboarding from './Screens/Onboarding'; 
import Profile from './Screens/Profile';
import Splash from './Screens/Splash';
import Home from './Screens/Home';
import Categories from './components/Categories';

const Stack=createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);


  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('onboardingCompleted');
        if (value === 'true') {
          setIsOnboardingCompleted(true);
        }
      } catch (e) {
        console.log('Error reading onboarding status', e);
      }
      setIsLoading(false);
    };

    checkOnboarding();
  }, []);

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      setIsOnboardingCompleted(true);
    } catch (e) {
      console.log('Error saving onboarding status', e);
    }
  };

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isOnboardingCompleted ? (
          <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <Stack.Screen name="Onboarding">
            {(props) => (
              <Onboarding {...props} onDone={completeOnboarding} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}