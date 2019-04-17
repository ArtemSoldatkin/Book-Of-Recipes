export const ADD_STEP = '[my_recipe] ADD_STEP';
export const EDIT_STEP = '[my_recipe] EDIT_STEP';
export const REMOVE_STEP = '[my_recipe] REMOVE_STEP';

export const ADD_INGREDIENT = '[my_recipe] ADD_INGREDIENT';
export const EDIT_INGREDIENT = '[my_recipe] EDIT_INGREDIENT';
export const REMOVE_INGREDIENT = '[my_recipe] REMOVE_INGREDIENT';

interface AddStepType {
    type: typeof ADD_STEP;
    payload: string;
}
interface EditStepType {
    type: typeof EDIT_STEP;
    payload: {
        id: number;
        step: string;
    };
}
interface RemoveStepType {
    type: typeof REMOVE_STEP;
    payload: number;
}

interface AddIngredientType {
    type: typeof ADD_INGREDIENT;
    payload: {
        id: number;
        name: string;
        count: number;
    };
}
interface EditIngredientType {
    type: typeof EDIT_INGREDIENT;
    payload: { id: number; count: number };
}
interface RemoveIngredientType {
    type: typeof REMOVE_INGREDIENT;
    payload: number;
}

export type Actions =
    | AddStepType
    | EditStepType
    | RemoveStepType
    | AddIngredientType
    | EditIngredientType
    | RemoveIngredientType;

export const addStep = (step: string): AddStepType => ({
    type: ADD_STEP,
    payload: step,
});

export const editStep = (id: number, step: string): EditStepType => ({
    type: EDIT_STEP,
    payload: { id, step },
});

export const removeStep = (id: number): RemoveStepType => ({
    type: REMOVE_STEP,
    payload: id,
});

export type MyAddIngredient = (id: number, name: string, count: number) => void;
export const my_add_ingredient = (id: number, name: string, count: number): AddIngredientType => ({
    type: ADD_INGREDIENT,
    payload: { id, name, count },
});

export type MyEditIngredient = (id: number, count: number) => void;
export const my_edit_ingredient = (id: number, count: number): EditIngredientType => ({
    type: EDIT_INGREDIENT,
    payload: { id, count },
});

export type MyRemoveIngredient = (id: number) => void;
export const my_remove_ingredient = (id: number): RemoveIngredientType => ({
    type: REMOVE_INGREDIENT,
    payload: id,
});
