import {
    ADD_STEP,
    EDIT_STEP,
    REMOVE_STEP,
    ADD_INGREDIENT,
    EDIT_INGREDIENT,
    REMOVE_INGREDIENT,
} from './actions';
import { Actions } from './actions';

interface MyIngredient {
    id: number;
    name: string;
    count: number;
}
export interface State {
    name: string;
    ingredients: MyIngredient[];
    steps: string[];
}
export const initialState: State = {
    name: 'test',
    ingredients: [],
    steps: [],
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
        case EDIT_INGREDIENT:
            let temp = state.ingredients.find(ingredient => ingredient.id === action.payload.id);
            if (temp) temp.count = action.payload.count;
            return { ...state };
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.filter(ingredient => ingredient.id !== action.payload),
                ],
            };
        default:
            return state;
    }
};
