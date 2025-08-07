export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'House' | 'Apartment' | 'Commercial';
  images: string[];
  description: string;
  amenities: string[];
  owner: {
    name: string;
    title: string;
    avatar: string;
    rating: number;
    phone: string;
    email: string;
  };
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    location: 'Downtown, NYC',
    price: 850000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: 'Apartment',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg'
    ],
    description: 'Beautiful modern apartment in the heart of downtown NYC. Features floor-to-ceiling windows, hardwood floors, and stunning city views. Recently renovated with high-end finishes throughout. Perfect for urban professionals seeking luxury living.',
    amenities: ['Parking', 'WiFi', 'TV', 'Security'],
    owner: {
      name: 'Sarah Johnson',
      title: 'Real Estate Agent',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      rating: 4.8,
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@realty.com'
    }
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
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg'
    ],
    description: 'Spacious family home in quiet suburban neighborhood. Features a large backyard, modern kitchen, and open floor plan perfect for entertaining. Close to excellent schools and parks. Move-in ready with recent updates throughout.',
    amenities: ['Parking', 'WiFi', 'Security'],
    owner: {
      name: 'Michael Chen',
      title: 'Property Owner',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      rating: 4.9,
      phone: '+1 (555) 987-6543',
      email: 'michael.chen@email.com'
    }
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
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'
    ],
    description: 'Stunning luxury villa in prestigious Beverly Hills location. Features pool, spa, wine cellar, and panoramic city views. Meticulously maintained with premium finishes and smart home technology throughout. Perfect for luxury living and entertaining.',
    amenities: ['Parking', 'WiFi', 'TV', 'Security'],
    owner: {
      name: 'Emma Rodriguez',
      title: 'Luxury Real Estate Specialist',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      rating: 5.0,
      phone: '+1 (555) 456-7890',
      email: 'emma.rodriguez@luxuryrealty.com'
    }
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
    images: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg'
    ],
    description: 'Charming studio apartment in trendy Brooklyn neighborhood. Features exposed brick walls, high ceilings, and updated kitchen. Walking distance to subway, restaurants, and shops. Perfect for first-time buyers or investors.',
    amenities: ['WiFi', 'Security'],
    owner: {
      name: 'David Park',
      title: 'Real Estate Investor',
      avatar: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      rating: 4.7,
      phone: '+1 (555) 234-5678',
      email: 'david.park@investments.com'
    }
  },
  {
    id: '5',
    title: 'Commercial Office Space',
    location: 'Manhattan, NY',
    price: 1200000,
    bedrooms: 0,
    bathrooms: 2,
    area: 1800,
    type: 'Commercial',
    images: [
      'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg',
      'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg'
    ],
    description: 'Prime commercial office space in prestigious Manhattan location. Features modern conference rooms, open workspace areas, and premium finishes. Excellent transportation access and nearby amenities. Perfect for growing businesses.',
    amenities: ['Parking', 'WiFi', 'Security'],
    owner: {
      name: 'Jennifer Walsh',
      title: 'Commercial Real Estate Broker',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      rating: 4.6,
      phone: '+1 (555) 345-6789',
      email: 'jennifer.walsh@commercial.com'
    }
  },
  {
    id: '6',
    title: 'Waterfront Condo',
    location: 'Miami Beach, FL',
    price: 950000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    type: 'Apartment',
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg'
    ],
    description: 'Spectacular waterfront condominium with direct ocean views. Features private balcony, marble floors, and resort-style amenities including pool, gym, and concierge. Walking distance to South Beach attractions and fine dining.',
    amenities: ['Parking', 'WiFi', 'TV', 'Security'],
    owner: {
      name: 'Carlos Martinez',
      title: 'Waterfront Property Specialist',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      rating: 4.9,
      phone: '+1 (555) 567-8901',
      email: 'carlos.martinez@waterfront.com'
    }
  }
];