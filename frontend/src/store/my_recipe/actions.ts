export const ADD_STEP = '[my_recipe] ADD_STEP';
export const EDIT_STEP = '[my_recipe] EDIT_STEP';
export const REMOVE_STEP = '[my_recipe] REMOVE_STEP';

export const ADD_INGREDIENT = '[my_recipe] ADD_INGREDIENT';
export const EDIT_INGREDIENT = '[my_recipe] EDIT_INGREDIENT';
export const REMOVE_INGREDIENT = '[my_recipe] REMOVE_INGREDIENT';

export const SET_IMAGE = '[my_recipe] SET_IMAGE';

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
interface SetImageType {
    type: typeof SET_IMAGE;
    payload: string;
}
export type Actions =
    | AddStepType
    | EditStepType
    | RemoveStepType
    | AddIngredientType
    | RemoveIngredientType
    | SetImageType;

export type AddStep = (step: string) => void;
export const addStep = (step: string): AddStepType => ({
    type: ADD_STEP,
    payload: step,
});

export type EditStep = (id: number, step: string) => void;
export const editStep = (id: number, step: string): EditStepType => ({
    type: EDIT_STEP,
    payload: { id, step },
});

export type RemoveStep = (id: number) => void;
export const removeStep = (id: number): RemoveStepType => ({
    type: REMOVE_STEP,
    payload: id,
});

export type MyAddIngredient = (id: number, name: string) => void;
export const my_add_ingredient = (id: number, name: string): AddIngredientType => ({
    type: ADD_INGREDIENT,
    payload: { id, name },
});

export type MyRemoveIngredient = (id: number) => void;
export const my_remove_ingredient = (id: number): RemoveIngredientType => ({
    type: REMOVE_INGREDIENT,
    payload: id,
});

export type SetImage = (img: string) => void;
export const set_image = (img: string): SetImageType => ({
    type: SET_IMAGE,
    payload: img,
});
