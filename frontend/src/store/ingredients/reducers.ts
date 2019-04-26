import { IngredientList } from '../../types';
import { SUCCESS, FAILURE, START } from './actions';
import { Actions } from './actions';

export type State = {
    loading: boolean;
    data: IngredientList;
    error: null | string;
};
export const initialState: State = {
    loading: false,
    data: [],
    error: null,
};

export const reducer = (state: State = initialState, action: Actions) => {
    switch (action.type) {
        case START:
            return {
                ...state,
                loading: true,
            };
        case SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: [...action.payload.data],
            };
        case FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
};
