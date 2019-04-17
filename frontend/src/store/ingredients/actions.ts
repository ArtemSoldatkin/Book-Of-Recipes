import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Ingridients as DATA } from './model';
import { start, success, failure, BaseActions } from '../base_actions';
const url = 'http://localhost:8000/api/ingredients/';

export const SUCCESS = '[ingridients] SUCCESS';
export const FAILURE = '[ingridients] FAILURE';
export const START = '[ingridients] START';
export type Actions = BaseActions<DATA, typeof START, typeof SUCCESS, typeof FAILURE>;

type ThunkResult = ThunkAction<void, any, undefined, Actions>;

export type GetIngredientList = () => void;
export const get_ingredient_list = (): ThunkResult => async dispatch => {
    dispatch(start(START));
    try {
        const { data } = await axios.get(url);
        if (!data) return dispatch(failure(FAILURE, 'error'));
        return dispatch(success(SUCCESS, data));
    } catch (err) {
        dispatch(failure(FAILURE, err.message));
    }
};

export type AddIngredient = (name: string) => void;
export const add_ingredient = (name: string): ThunkResult => async (dispatch, getState) => {
    dispatch(start(START));
    try {
        const { data } = await axios.post(url, { name });
        if (!data) return dispatch(failure(FAILURE, 'error'));
        const { data: prev_data } = getState().ingredient_list;
        return dispatch(success(SUCCESS, [...prev_data, data]));
    } catch (err) {
        dispatch(failure(FAILURE, err.message));
    }
};
