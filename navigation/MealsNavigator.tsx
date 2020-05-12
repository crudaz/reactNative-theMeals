import * as React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FilterScreen from '../screens/FilterScreen';

import { Ionicons } from 'react-native-vector-icons'; 
import Colors from '../constants/Colors';


const defaultStackOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTitleStyle: {
    // fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    // fontFamily: 'open-sans-bold'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen'
};

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen,
    navigationOptions: {
      headerTitle: 'Meals Categories'
    },
  },
  CategoryMeals: {
    screen: CategoryMealsScreen
  },
  MealDetail : MealDetailScreen
  },
  {
    defaultNavigationOptions: defaultStackOptions
  }
);

const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: defaultStackOptions
});

const tabScreenConfig = {
    Meals: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
        }
      },
      tabBarColor: Colors.primaryColor,
      // tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
    },
    Favorites: {
      screen: FavNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
          );
        },
        tabBarColor: Colors.accentColor,
        // tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Favorites'
      }
    }
};

const MealsFavTabNavigator = Platform.OS === 'android' 
? createMaterialBottomTabNavigator(tabScreenConfig, {
  activeTintColor: 'white',
  shifting: true,
  barStyle: {
    backgroundColor: Colors.primaryColor
  }
})
: createBottomTabNavigator(tabScreenConfig, {
  tabBarOptions: {
    labelStyle: {
      // fontFamily: 'open-sans'
    },
    activeTintColor: Colors.accentColor
  }
});

const FiltersNavigator = createStackNavigator(
  {
    Filters: FilterScreen
  },
  {
    // navigationOptions: {
    //   drawerLabel: 'Filters!!!'
    // },
    defaultNavigationOptions: defaultStackOptions
  }
);

const MainNavigator = createDrawerNavigator({
  MealsFavs: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: FiltersNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.accentColor,
    labelStyle: {
      // fontFamily: 'open-sans'
    }
  }
});

export default createAppContainer(MainNavigator);