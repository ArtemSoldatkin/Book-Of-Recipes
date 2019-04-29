import {
    ADD_STEP,
    EDIT_STEP,
    REMOVE_STEP,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_IMAGE,
} from './actions';
import { Actions } from './actions';
import { MyIngredientList } from '../../types';

export interface State {
    name: string;
    ingredients: MyIngredientList;
    steps: string[];
    image: string;
}
export const initialState: State = {
    name: 'test',
    ingredients: [],
    steps: [],
    image: '',
};

export const reducer = (state: State = initialState, action: Actions) => {
    switch (action.type) {
        case ADD_STEP:
            return { ...state, steps: [...state.steps, action.payload] };
        case EDIT_STEP:
            state.steps[action.payload.id] = action.payload.step;
            return { ...state, steps: [...state.steps] };
        case REMOVE_STEP:
            state.steps.splice(action.payload, 1);
            return { ...state, steps: [...state.steps] };
        case ADD_INGREDIENT:
            return { ...state, ingredients: [...state.ingredients, action.payload] };
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.filter(ingredient => ingredient.id !== action.payload),
                ],
            };
        case SET_IMAGE:
            return { ...state, image: action.payload };
        default:
            return state;
    }
};
