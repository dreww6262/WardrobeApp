import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootTabParamList } from '../types/navigation';

type Props = BottomTabScreenProps<RootTabParamList, 'Profile'>;

interface PreferenceItem {
  id: string;
  title: string;
  value: boolean;
}

const ProfileScreen: React.FC<Props> = () => {
  const [preferences, setPreferences] = useState<PreferenceItem[]>([
    { id: '1', title: 'Dark Mode', value: false },
    { id: '2', title: 'Push Notifications', value: true },
    { id: '3', title: 'Daily Outfit Suggestions', value: true },
  ]);

  const [style, setStyle] = useState<string[]>([
    'Casual',
    'Professional',
    'Athletic',
  ]);

  const handlePreferenceToggle = (id: string) => {
    setPreferences(preferences.map(pref =>
      pref.id === id ? { ...pref, value: !pref.value } : pref
    ));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: '/api/placeholder/100/100' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton}>
            <Icon name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>User Name</Text>
        <Text style={styles.email}>user@example.com</Text>
      </View>

      {/* Style Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Style Preferences</Text>
        <View style={styles.styleContainer}>
          {style.map((item, index) => (
            <TouchableOpacity key={index} style={styles.styleTag}>
              <Text style={styles.styleTagText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* App Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        {preferences.map((pref) => (
          <View key={pref.id} style={styles.preferenceItem}>
            <Text style={styles.preferenceTitle}>{pref.title}</Text>
            <Switch
              value={pref.value}
              onValueChange={() => handlePreferenceToggle(pref.id)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={pref.value ? '#007AFF' : '#f4f3f4'}
            />
          </View>
        ))}
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Edit Profile')}>
          <Icon name="account-edit" size={20} color="#007AFF" />
          <Text style={styles.actionButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Help & Support')}>
          <Icon name="help-circle" size={20} color="#007AFF" />
          <Text style={styles.actionButtonText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.logoutButton]} 
          onPress={handleLogout}
        >
          <Icon name="logout" size={20} color="#FF3B30" />
          <Text style={[styles.actionButtonText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  styleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  styleTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  styleTagText: {
    fontSize: 14,
    color: '#333',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  preferenceTitle: {
    fontSize: 16,
    color: '#333',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 10,
  },
  actionButtonText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  logoutButton: {
    marginTop: 20,
  },
  logoutText: {
    color: '#FF3B30',
  },
});

export default ProfileScreen;