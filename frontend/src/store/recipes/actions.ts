import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Recipes as DATA } from './models';
import { start, success, failure, BaseActions } from '../base_actions';

const url = 'http://localhost:8000/api/recipes/';

export const SUCCESS = '[recipes] SUCCESS';
export const FAILURE = '[recipes] FAILURE';
export const START = '[recipes] START';
export type Actions = BaseActions<DATA, typeof START, typeof SUCCESS, typeof FAILURE>;

type ThunkResult = ThunkAction<void, any, undefined, Actions>;

export const getRecipes = (): ThunkResult => async dispatch => {
    dispatch(start(START));
    try {
        const { data } = await axios.get(url);
        if (!data) return dispatch(failure(FAILURE, 'error'));
        return dispatch(success(SUCCESS, data));
    } catch (err) {
        dispatch(failure(FAILURE, err.message));
    }
};

interface MyIngridient {
    id: number;
    name: string;
    count: number;
}

interface MyRecipe {
    name: string;
    ingredients: MyIngridient[];
    steps: string[];
}

export const addRecipe = (): ThunkResult => async (dispatch, getState) => {
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
