import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootTabParamList } from './src/types/navigation';

// Screens
import UploadWardrobe from './src/screens/upload-wardrobe';
import AIStylist from './src/screens/ai-stylist';
import ProfileScreen from './src/screens/profile';

const Tab = createBottomTabNavigator<RootTabParamList>();

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string;

              switch (route.name) {
                case 'UploadWardrobe':
                  iconName = focused ? 'upload' : 'upload-outline';
                  break;
                case 'AIStylist':
                  iconName = focused ? 'tshirt-crew' : 'tshirt-crew-outline';
                  break;
                case 'Profile':
                  iconName = focused ? 'account' : 'account-outline';
                  break;
                default:
                  iconName = 'help';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          })}
        >
          <Tab.Screen name="AIStylist" component={AIStylist} options={{ title: 'AI Stylist' }} />
          <Tab.Screen name="UploadWardrobe" component={UploadWardrobe} options={{ title: 'Upload Wardrobe' }} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;