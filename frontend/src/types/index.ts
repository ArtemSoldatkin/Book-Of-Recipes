//TYPES
export interface User {
    id: string;
    username: string;
}

export interface AsyncData<D> {
    loading: boolean;
    error: null | string;
    data: D;
}

interface Ingredient {
    id: number;
    name: string;
}

export type IngredientList = Ingredient[];

export interface MyIngredient {
    id: number;
    name: string;
    count: number;
}

export type MyIngredientList = MyIngredient[];

export type Steps = string[];

export interface Recipe {
    id: number;
    name: string;
    ingredients: IngredientList;
    steps: Steps;
}

export type RecipeList = Recipe[];

//EQUALS
export const stepsEq = (_a: Steps, _b: Steps) => {
    if (_a === _b) return true;
    if (_a.length !== _b.length) return false;
    const a = [..._a],
        b = [..._b];
    a.sort(), b.sort();
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
};

export const recipeEq = (a: Recipe, b: Recipe) => {
    if (
        a.id !== b.id ||
        a.name !== b.name ||
        !ingredientListEq(a.ingredients, b.ingredients || !stepsEq(a.steps, b.steps))
    )
        return false;
    return true;
};
export const recipeListEq = (_a: RecipeList, _b: RecipeList) => {
    if (_a === _b) return true;
    if (_a.length !== _b.length) return false;
    const a = [..._a],
        b = [..._b];
    a.sort(), b.sort();
    for (let i = 0; i < a.length; ++i) {
        if (!recipeEq(a[i], b[i])) return false;
    }
    return true;
};

export const ingredientEq = (a: Ingredient, b: Ingredient) => {
    if (a.id !== b.id || a.name !== b.name) return false;
    return true;
};
export const ingredientListEq = (_a: IngredientList, _b: IngredientList) => {
    if (_a === _b) return true;
    if (_a.length !== _b.length) return false;
    const a = [..._a],
        b = [..._b];
    a.sort(), b.sort();
    for (let i = 0; i < a.length; ++i) {
        if (!ingredientEq(a[i], b[i])) return false;
    }
    return true;
};
