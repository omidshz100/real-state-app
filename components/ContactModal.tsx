import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { X, Phone, Mail, MessageCircle } from 'lucide-react-native';

interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
  ownerName: string;
  propertyTitle: string;
}

export default function ContactModal({ visible, onClose, ownerName, propertyTitle }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [contactMethod, setContactMethod] = useState<'phone' | 'email' | 'message'>('message');

  const handleSendInquiry = () => {
    if (!name || !email || !message) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    // In a real app, this would send the inquiry to the backend
    Alert.alert(
      'Inquiry Sent!', 
      `Your message has been sent to ${ownerName}. They will contact you soon.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
            onClose();
          }
        }
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Contact Owner</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.propertyInfo}>
            Inquiring about: <Text style={styles.propertyTitle}>{propertyTitle}</Text>
          </Text>
          <Text style={styles.ownerInfo}>Owner: {ownerName}</Text>

          {/* Contact Method Selection */}
          <View style={styles.methodContainer}>
            <Text style={styles.sectionTitle}>Preferred Contact Method</Text>
            <View style={styles.methodButtons}>
              <TouchableOpacity
                style={[styles.methodButton, contactMethod === 'phone' && styles.activeMethod]}
                onPress={() => setContactMethod('phone')}
              >
                <Phone size={20} color={contactMethod === 'phone' ? '#FFFFFF' : '#6B7280'} />
                <Text style={[styles.methodText, contactMethod === 'phone' && styles.activeMethodText]}>
                  Phone
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.methodButton, contactMethod === 'email' && styles.activeMethod]}
                onPress={() => setContactMethod('email')}
              >
                <Mail size={20} color={contactMethod === 'email' ? '#FFFFFF' : '#6B7280'} />
                <Text style={[styles.methodText, contactMethod === 'email' && styles.activeMethodText]}>
                  Email
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.methodButton, contactMethod === 'message' && styles.activeMethod]}
                onPress={() => setContactMethod('message')}
              >
                <MessageCircle size={20} color={contactMethod === 'message' ? '#FFFFFF' : '#6B7280'} />
                <Text style={[styles.methodText, contactMethod === 'message' && styles.activeMethodText]}>
                  Message
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Name *</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address *</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Message *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={message}
                onChangeText={setMessage}
                placeholder="I'm interested in this property. Please contact me with more details."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={handleSendInquiry}>
            <Text style={styles.sendButtonText}>Send Inquiry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  propertyInfo: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  propertyTitle: {
    fontWeight: '600',
    color: '#111827',
  },
  ownerInfo: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  methodContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  methodButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  methodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  activeMethod: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  methodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeMethodText: {
    color: '#FFFFFF',
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    height: 100,
    paddingTop: 10,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  sendButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#2563EB',
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});