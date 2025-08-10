import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

export default function Categories({ selectedCategory, setSelectedCategory }) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category || (category === 'All' && !selectedCategory);
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                isSelected && styles.categoryButtonSelected,
              ]}
              onPress={() => {
                if (category === 'All') {
                  setSelectedCategory(null); 
                } else {
                  setSelectedCategory(category);
                }
              }}
            >
              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.categoryTextSelected,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  categoryButton: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonSelected: {
    backgroundColor: '#495E57', 
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  categoryTextSelected: {
    color: 'white',
  },
});
