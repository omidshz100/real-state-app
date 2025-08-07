import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react-native';
import { router } from 'expo-router';

// Mock favorites data (in a real app, this would come from state management)
const favoriteProperties = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    location: 'Downtown, NYC',
    price: 850000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
    type: 'Apartment'
  },
  {
    id: '3',
    title: 'Luxury Family Villa',
    location: 'Beverly Hills, CA',
    price: 2500000,
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'],
    type: 'House'
  }
];

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState(favoriteProperties);

  const removeFavorite = (propertyId: string) => {
    setFavorites(favorites.filter(property => property.id !== propertyId));
  };

  const navigateToProperty = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Favorites</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Heart size={64} color="#D1D5DB" />
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyText}>
            Start exploring properties and add them to your favorites to see them here.
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.browseButtonText}>Browse Properties</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
        <Text style={styles.subtitle}>{favorites.length} Properties</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {favorites.map((property) => (
          <TouchableOpacity
            key={property.id}
            style={styles.propertyCard}
            onPress={() => navigateToProperty(property.id)}
          >
            <Image source={{ uri: property.images[0] }} style={styles.propertyImage} />
            
            <View style={styles.propertyInfo}>
              <View style={styles.propertyHeader}>
                <Text style={styles.propertyPrice}>${property.price.toLocaleString()}</Text>
                <TouchableOpacity 
                  style={styles.favoriteButton}
                  onPress={() => removeFavorite(property.id)}
                >
                  <Heart size={20} color="#EF4444" fill="#EF4444" />
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  browseButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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