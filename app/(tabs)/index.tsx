import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Bed, Bath, Square, Heart } from 'lucide-react-native';
import { router } from 'expo-router';
import { properties } from '@/data/properties';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterOptions = ['All', 'House', 'Apartment', 'Commercial'];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || property.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const navigateToProperty = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Find Your</Text>
          <Text style={styles.title}>Dream Home</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search location, property..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {filterOptions.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                selectedFilter === filter && styles.activeFilterTab
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Properties List */}
        <View style={styles.propertiesContainer}>
          <Text style={styles.sectionTitle}>
            {filteredProperties.length} Properties Found
          </Text>
          
          {filteredProperties.map((property) => (
            <TouchableOpacity
              key={property.id}
              style={styles.propertyCard}
              onPress={() => navigateToProperty(property.id)}
            >
              <Image source={{ uri: property.images[0] }} style={styles.propertyImage} />
              
              <View style={styles.propertyInfo}>
                <View style={styles.propertyHeader}>
                  <Text style={styles.propertyPrice}>${property.price.toLocaleString()}</Text>
                  <TouchableOpacity style={styles.favoriteButton}>
                    <Heart size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.propertyTitle}>{property.title}</Text>
                
                <View style={styles.locationContainer}>
                  <MapPin size={16} color="#6B7280" />
                  <Text style={styles.locationText}>{property.location}</Text>
                </View>
                
                <View style={styles.propertyFeatures}>
                  <View style={styles.feature}>
                    <Bed size={16} color="#6B7280" />
                    <Text style={styles.featureText}>{property.bedrooms}</Text>
                  </View>
                  <View style={styles.feature}>
                    <Bath size={16} color="#6B7280" />
                    <Text style={styles.featureText}>{property.bathrooms}</Text>
                  </View>
                  <View style={styles.feature}>
                    <Square size={16} color="#6B7280" />
                    <Text style={styles.featureText}>{property.area} sqft</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeFilterTab: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  propertiesContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  propertyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  propertyImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F3F4F6',
  },
  propertyInfo: {
    padding: 16,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  propertyPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
  },
  favoriteButton: {
    padding: 4,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  propertyFeatures: {
    flexDirection: 'row',
    gap: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featureText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});