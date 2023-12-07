import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import ListingScreen from '../screens/ListingScreen';
import MapButton from '../navigation/MapButton';
import MyDogsNavigator from '../navigation/MyDogsNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const navigation = useNavigation();

  const TabBarButton = ({ onPress, children }) => (
    <TouchableOpacity onPress={onPress} style={styles.tabBarButton}>
      <View>{children}</View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen
          name="map"
          component={WelcomeScreen}
          options={{
            tabBarButton: () => (
              <MapButton onPress={() => navigation.navigate('ListingScreen')}/>
            ),
          }}
        />
        <Tab.Screen
          name="Liste"
          component={ListingScreen}
          options={{
            tabBarButton: () => (
              <MapButton onPress={() => navigation.navigate('ListingScreen')}/>
            ),
          }}
        />
         <Tab.Screen
            name="My Dogs"
            component={MyDogsNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="dog" color={color} size={size} />
              ),
            }}
          />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default BottomTabNavigator;