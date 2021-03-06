import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RecipeList as DATA } from '../../types';
import { start, success, failure, BaseActions } from '../base_actions';
import { MyRecipe } from '../../types';

const url = 'http://localhost:8000/api/recipes/';

export const SUCCESS = '[recipes] SUCCESS';
export const FAILURE = '[recipes] FAILURE';
export const START = '[recipes] START';

export type Actions = BaseActions<DATA, typeof START, typeof SUCCESS, typeof FAILURE>;

type ThunkResult = ThunkAction<void, any, undefined, Actions>;

export type GetRecipes = () => void;
export const get_recipes = (): ThunkResult => async (dispatch, getState) => {
    dispatch(start(START));
    try {
        const search: string = getState().filters.search;
        const { data } = await axios.get(url, { params: { search } });
        if (!data) return dispatch(failure(FAILURE, 'error'));
        return dispatch(success(SUCCESS, data));
    } catch (err) {
        dispatch(failure(FAILURE, err.message));
    }
};

export type AddRecipe = () => void;
export const add_recipe = (): ThunkResult => async (dispatch, getState) => {
    dispatch(start(START));
    try {
        const my_recipe: MyRecipe = getState().my_recipe;
        const { data } = await axios.post(url, {
            ...my_recipe,
            //ingridients: my_recipe.ingridients.map(ingr => ingr.id),
        });
        if (!data) return dispatch(failure(FAILURE, 'error'));
        const { data: prev_data } = getState().ingredients;
        return dispatch(success(SUCCESS, [...prev_data, data]));
    } catch (err) {
        dispatch(failure(FAILURE, err.message));
    }
};
