import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Image,
  SafeAreaView 
} from 'react-native';

// Mock data for Expo Snack
const properties = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    location: 'Downtown, NYC',
    price: 850000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: 'Apartment',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    title: 'Suburban Family Home',
    location: 'Westchester, NY',
    price: 675000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    type: 'House',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    title: 'Luxury Family Villa',
    location: 'Beverly Hills, CA',
    price: 2500000,
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    type: 'House',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    title: 'Cozy Studio Apartment',
    location: 'Brooklyn, NY',
    price: 420000,
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    type: 'Apartment',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '5',
    title: 'Waterfront Condo',
    location: 'Miami Beach, FL',
    price: 950000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    type: 'Apartment',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

// Simple icon components (since lucide-react-native might not work in Snack)
const SearchIcon = () => <Text style={{fontSize: 16}}>🔍</Text>;
const FilterIcon = () => <Text style={{fontSize: 16}}>🔧</Text>;
const LocationIcon = () => <Text style={{fontSize: 14}}>📍</Text>;
const BedIcon = () => <Text style={{fontSize: 14}}>🛏️</Text>;
const BathIcon = () => <Text style={{fontSize: 14}}>🛁</Text>;
const AreaIcon = () => <Text style={{fontSize: 14}}>📐</Text>;
const HeartIcon = () => <Text style={{fontSize: 16}}>♡</Text>;

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterOptions = ['All', 'House', 'Apartment', 'Commercial'];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || property.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
            <SearchIcon />
            <TextInput
              style={styles.searchInput}
              placeholder="Search location, property..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <FilterIcon />
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
              onPress={() => alert(`Viewing ${property.title}`)}
            >
              <Image source={{ uri: property.image }} style={styles.propertyImage} />
              
              <View style={styles.propertyInfo}>
                <View style={styles.propertyHeader}>
                  <Text style={styles.propertyPrice}>${property.price.toLocaleString()}</Text>
                  <TouchableOpacity style={styles.favoriteButton}>
                    <HeartIcon />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.propertyTitle}>{property.title}</Text>
                
                <View style={styles.locationContainer}>
                  <LocationIcon />
                  <Text style={styles.locationText}>{property.location}</Text>
                </View>
                
                <View style={styles.propertyFeatures}>
                  <View style={styles.feature}>
                    <BedIcon />
                    <Text style={styles.featureText}>{property.bedrooms}</Text>
                  </View>
                  <View style={styles.feature}>
                    <BathIcon />
                    <Text style={styles.featureText}>{property.bathrooms}</Text>
                  </View>
                  <View style={styles.feature}>
                    <AreaIcon />
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
    paddingTop: 40,
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