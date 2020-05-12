import React, { useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MEALS } from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toogleFavorite  } from '../store/actions/meals';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
}

const MealDetailScreen = props => {
  const availableMeals = useSelector(state => state.meals.meals);
  const currentMealIsFavorite = useSelector(
    state => state.meals.favoriteMeals.some(meal => meal.id === mealId)
  );
  const mealId = props.navigation.getParam('mealId');

  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();

  const toogleFavoriteHandler = useCallback(() => {
    dispatch(toogleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({toogleFav: toogleFavoriteHandler});
  }, [toogleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({isFav: currentMealIsFavorite});
  }, [currentMealIsFavorite])

  return (
    <ScrollView>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => <ListItem key={step}>{step}</ListItem>)}
    </ScrollView>
  );
}

MealDetailScreen.navigationOptions = navigationData => {
  const mealId = navigationData.navigation.getParam('mealId');
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toogleFavotite = navigationData.navigation.getParams('toogleFav');
  const isFavorite = navigationData.navigation.getParams('isFav');
  // const selectedMeal = MEALS.find(meal => meal.id === mealId);

  return {
    headerTitle: mealTitle,
    headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item 
        title="Favorite" 
        iconName={isFavorite ? 'ios-star' : 'ios-star-outline' } 
        onPress={toogleFavotite} 
      />
    </HeaderButtons>
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    // fontFamily: 'open-sans-bold',
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }

});

export default MealDetailScreen;