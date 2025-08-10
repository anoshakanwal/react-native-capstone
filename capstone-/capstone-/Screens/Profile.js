import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaskedTextInput } from 'react-native-mask-text';
import * as ImagePicker from 'expo-image-picker';

const Profile = ({ navigation }) => {
  const [avatarUri, setAvatarUri] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notifications, setNotifications] = useState({
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  });

  useEffect(() => {
    // Load data on mount
    (async () => {
      const savedAvatar = await AsyncStorage.getItem('avatarUri');
      const savedFirst = await AsyncStorage.getItem('firstName');
      const savedLast = await AsyncStorage.getItem('lastName');
      const savedEmail = await AsyncStorage.getItem('email');
      const savedPhone = await AsyncStorage.getItem('phoneNumber');
      const savedNotifs = await AsyncStorage.getItem('notifications');

      if (savedAvatar) setAvatarUri(savedAvatar);
      if (savedFirst) setFirstName(savedFirst);
      if (savedLast) setLastName(savedLast);
      if (savedEmail) setEmail(savedEmail);
      if (savedPhone) setPhoneNumber(savedPhone);
      if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
    })();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access media library is required!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setAvatarUri(null);
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const saveChanges = async () => {
    try {
      await AsyncStorage.multiSet([
        ['avatarUri', avatarUri || ''],
        ['firstName', firstName],
        ['lastName', lastName],
        ['email', email],
        ['phoneNumber', phoneNumber],
        ['notifications', JSON.stringify(notifications)],
      ]);
      Alert.alert('Success', 'Profile saved successfully.');
    } catch (e) {
      Alert.alert('Error', 'Failed to save profile.');
    }
  };

  const discardChanges = () => {
    // Reload from AsyncStorage or clear fields - here just reload
    (async () => {
      const savedAvatar = await AsyncStorage.getItem('avatarUri');
      const savedFirst = await AsyncStorage.getItem('firstName');
      const savedLast = await AsyncStorage.getItem('lastName');
      const savedEmail = await AsyncStorage.getItem('email');
      const savedPhone = await AsyncStorage.getItem('phoneNumber');
      const savedNotifs = await AsyncStorage.getItem('notifications');

      setAvatarUri(savedAvatar || null);
      setFirstName(savedFirst || '');
      setLastName(savedLast || '');
      setEmail(savedEmail || '');
      setPhoneNumber(savedPhone || '');
      setNotifications(savedNotifs ? JSON.parse(savedNotifs) : {
        orderStatuses: true,
        passwordChanges: true,
        specialOffers: true,
        newsletter: true,
      });
    })();
  };

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Personal information</Text>

      <Text style={styles.label}>Avatar</Text>
      <View style={styles.avatarRow}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarInitials}>
              {(firstName?.[0] ?? '') + (lastName?.[0] ?? '')}
            </Text>
          </View>
        )}
        <View style={styles.avatarButtons}>
          <TouchableOpacity style={styles.changeButton} onPress={pickImage}>
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.label}>First name</Text>
      <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

      <Text style={styles.label}>Last name</Text>
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Phone number</Text>
      <MaskedTextInput
        mask="(999) 999-9999"
        keyboardType="phone-pad"
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <Text style={[styles.heading, { marginTop: 24 }]}>Email notifications</Text>
      {[
        { key: 'orderStatuses', label: 'Order statuses' },
        { key: 'passwordChanges', label: 'Password changes' },
        { key: 'specialOffers', label: 'Special offers' },
        { key: 'newsletter', label: 'Newsletter' },
      ].map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          style={styles.checkboxContainer}
          onPress={() => toggleNotification(key)}
        >
          <View style={[styles.checkbox, notifications[key] && styles.checkboxChecked]}>
            {notifications[key] && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>{label}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.discardButton} onPress={discardChanges}>
          <Text style={styles.discardButtonText}>Discard changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
          <Text style={styles.saveButtonText}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  heading: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  label: { fontWeight: '600', marginBottom: 4, marginTop: 12, color: '#333' },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 72, height: 72, borderRadius: 36, marginRight: 12 },
  avatarPlaceholder: {
    backgroundColor: '#A2B29F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: { color: 'white', fontWeight: '700', fontSize: 28 },
  avatarButtons: { flexDirection: 'row' },
  changeButton: {
    backgroundColor: '#A2B29F',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  changeButtonText: { color: 'white', fontWeight: '600' },
  removeButton: {
    borderWidth: 1,
    borderColor: '#A2B29F',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  removeButtonText: { color: '#A2B29F', fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#A2B29F',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#A2B29F',
  },
  checkmark: { color: 'white', fontWeight: '700' },
  checkboxLabel: { fontSize: 16 },
  logoutButton: {
    backgroundColor: '#F4CE14',
    paddingVertical: 14,
    borderRadius: 6,
    marginTop: 24,
    alignItems: 'center',
  },
  logoutButtonText: { fontWeight: '700', fontSize: 18, color: '#333' },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  discardButton: {
    borderWidth: 1,
    borderColor: '#A2B29F',
    paddingVertical: 14,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  discardButtonText: { color: '#A2B29F', fontWeight: '700', fontSize: 16 },
  saveButton: {
    backgroundColor: '#A2B29F',
    paddingVertical: 14,
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: { color: 'white', fontWeight: '700', fontSize: 16 },
});

export default Profile;