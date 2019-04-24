import { combineReducers } from 'redux';
import * as Ingridients from './ingredients/reducers';
import * as MyRecipe from './my_recipe/reducers';
import * as Recipes from './recipes/reducers';
import * as Filters from './filters/reducers';

export interface State {
    ingredient_list: Ingridients.State;
    my_recipe: MyRecipe.State;
    recipes: Recipes.State;
    filters: Filters.State;
}

export const initialState: State = {
    ingredient_list: Ingridients.initialState,
    my_recipe: MyRecipe.initialState,
    recipes: Recipes.initialState,
    filters: Filters.initialState,
};

export const reducer = combineReducers<State>({
    ingredient_list: Ingridients.reducer,
    my_recipe: MyRecipe.reducer,
    recipes: Recipes.reducer,
    filters: Filters.reducer,
});
