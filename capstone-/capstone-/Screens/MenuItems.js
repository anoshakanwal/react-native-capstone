import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

export default function Menu({ menuItems }) {
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
    <FlatList
      data={menuItems}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 10,
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
  }
});
