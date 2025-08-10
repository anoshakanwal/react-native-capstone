import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Header({ navigation, avatarUri }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <Image source={require('../assets/Profile.png')} style={styles.avatar} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  logo: { 
    width: 204, 
    height: 56,
  },
  avatar: { 
    width: 40, 
    height: 40, 
    borderRadius: 20 
  },
});
