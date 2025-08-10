import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import Header from '../components/Header';
import menuData from '../menu.json';
import Menu from './MenuItems';
import Categories from '../components/Categories';
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  const [avatarUri, setAvatarUri] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

useEffect(() => {
    setMenuItems(menuData.menu);
  }, []);

useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchText);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText]);

useEffect(() => {
    let filtered = menuData.menu;

    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      const queryLower = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(queryLower)
      );
    }

  setMenuItems(filtered);
  }, [searchQuery, selectedCategory]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} avatarUri={avatarUri} />
      <View style={styles.hero}>
        <View style={styles.heroTextContainer}>
        <Text style={styles.heroTitle}>Little Lemon</Text>
        <Text style={styles.heroSubtitle}>Chicago</Text>
        <Text style={styles.heroDescription}>
            We are a family-owned Mediterranean restaurant, focused on traditional
            recipes served with a modern twist.
        </Text>
        </View>
        <Image
        source={require( '../assets/Hero.png' )}
        style={styles.heroImage}
        resizeMode="cover"
        />
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <Categories 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Text style={{ padding: 20, fontSize: 18, fontWeight: 'bold' }}>
        Menu
      </Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: { 
    flexDirection: 'row', 
    paddingVertical: 10, 
    borderBottomWidth: 1, 
    borderColor: '#ddd' 
  },
  itemImage: { 
    width: 80, 
    height: 80, 
    borderRadius: 8 
  },
  itemInfo: { 
    flex: 1, 
    marginLeft: 10 
  },
  itemTitle: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  itemDescription: { 
    color: '#555' 
  },
  itemPrice: { 
    marginTop: 5, 
    fontWeight: 'bold' 
  },
  hero: {
  flexDirection: 'row',
  backgroundColor: '#495E57',
  padding: 20,
  alignItems: 'center',
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F4CE14',
  },
  heroSubtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#EDEFEE',
    marginBottom: 10,
  },
  heroDescription: {
    fontSize: 14,
    color: '#EDEFEE',
  },
  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  searchBar: {
      backgroundColor: '#EDEFEE',
      padding: 10,
      marginHorizontal: 20,
      marginTop: 10,
      borderRadius: 8,
      fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
  },
});
