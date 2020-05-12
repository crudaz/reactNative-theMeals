import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const FavoriteScreen = props => {
  const favMeals = useSelector(state => state.meals.favoriteMeals);
  if(favMeals.length === 0 || !favMeals) {
    return <View style={styles.content}>
      <DefaultText>No favorite meals found. Start adding some!</DefaultText>
    </View>
  }

  return <MealList listData={favMeals} navigation={props.navigation} />;
};

FavoriteScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Meal Favorites',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName='ios-menu'
          onPress={() => {
            navData.navigation.openDrawer()
          }}
        />
      </HeaderButtons>
      )
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default FavoriteScreen;