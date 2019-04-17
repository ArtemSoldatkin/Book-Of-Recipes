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

//EQUALS
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
