import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Square, Car, Wifi, Tv, Shield, Phone, MessageCircle, Mail } from 'lucide-react-native';
import { properties } from '@/data/properties';

const { width } = Dimensions.get('window');

export default function PropertyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Property not found</Text>
      </SafeAreaView>
    );
  }

  const amenityIcons: { [key: string]: any } = {
    'Parking': Car,
    'WiFi': Wifi,
    'TV': Tv,
    'Security': Shield,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={20} color="#111827" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                size={20} 
                color={isFavorite ? "#EF4444" : "#111827"}
                fill={isFavorite ? "#EF4444" : "transparent"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
            scrollEventThrottle={16}
          >
            {property.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.propertyImage} />
            ))}
          </ScrollView>
          
          <View style={styles.imageIndicator}>
            <Text style={styles.imageCounter}>
              {currentImageIndex + 1} / {property.images.length}
            </Text>
          </View>
        </View>

        {/* Property Info */}
        <View style={styles.propertyInfo}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${property.price.toLocaleString()}</Text>
            <View style={styles.typeTag}>
              <Text style={styles.typeText}>{property.type}</Text>
            </View>
          </View>
          
          <Text style={styles.title}>{property.title}</Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#6B7280" />
            <Text style={styles.location}>{property.location}</Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Bed size={20} color="#2563EB" />
              <Text style={styles.featureText}>{property.bedrooms} Beds</Text>
            </View>
            <View style={styles.feature}>
              <Bath size={20} color="#2563EB" />
              <Text style={styles.featureText}>{property.bathrooms} Baths</Text>
            </View>
            <View style={styles.feature}>
              <Square size={20} color="#2563EB" />
              <Text style={styles.featureText}>{property.area} sqft</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{property.description}</Text>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {property.amenities.map((amenity, index) => {
                const IconComponent = amenityIcons[amenity] || Shield;
                return (
                  <View key={index} style={styles.amenityItem}>
                    <IconComponent size={20} color="#10B981" />
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Owner Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Property Owner</Text>
            <View style={styles.ownerCard}>
              <Image source={{ uri: property.owner.avatar }} style={styles.ownerAvatar} />
              <View style={styles.ownerInfo}>
                <Text style={styles.ownerName}>{property.owner.name}</Text>
                <Text style={styles.ownerTitle}>{property.owner.title}</Text>
                <Text style={styles.ownerRating}>⭐ {property.owner.rating} (24 reviews)</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Contact Buttons */}
      <View style={styles.contactContainer}>
        <TouchableOpacity style={styles.callButton}>
          <Phone size={20} color="#FFFFFF" />
          <Text style={styles.callButtonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageButton}>
          <MessageCircle size={20} color="#FFFFFF" />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.emailButton}>
          <Mail size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  propertyImage: {
    width: width,
    height: 300,
    backgroundColor: '#F3F4F6',
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  imageCounter: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  propertyInfo: {
    padding: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#10B981',
  },
  typeTag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 4,
  },
  location: {
    fontSize: 16,
    color: '#6B7280',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  feature: {
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    minWidth: '45%',
  },
  amenityText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  ownerCard: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },
  ownerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  ownerTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  ownerRating: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '500',
  },
  contactContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#10B981',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  messageButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emailButton: {
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 12,
  },
});