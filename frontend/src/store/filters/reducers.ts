import { SET_SEARCH } from './actions';
import { Actions } from './actions';

export type State = {
    search: string;
};
export const initialState: State = {
    search: '',
};

export const reducer = (state: State = initialState, action: Actions) => {
    switch (action.type) {
        case SET_SEARCH:
            return {
                ...state,
                search: action.payload,
            };
        default:
            return state;
    }
};
