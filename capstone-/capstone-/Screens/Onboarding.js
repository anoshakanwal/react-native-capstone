import React, { useState, useEffect } from 'react';
import { Button, View, StyleSheet, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Onboarding({ onDone }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    (async () => {
      const savedFirst = await AsyncStorage.getItem('firstName');
      const savedEmail = await AsyncStorage.getItem('email');

      if (savedFirst) setFirstName(savedFirst);
      if (savedEmail) setEmail(savedEmail);
    })();
  }, []);

  const saveAndFinish = async () => {
    await AsyncStorage.setItem('firstName', firstName);
    await AsyncStorage.setItem('email', email);
    onDone();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Onboarding!</Text>

      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Enter your first name"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.buttonContainer}>
        <Button title="Finish Onboarding" onPress={saveAndFinish} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#d3d9df',
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginTop: 40,
  },
});
