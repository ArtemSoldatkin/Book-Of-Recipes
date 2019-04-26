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

//_ingredient
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

//_recipe_step
export type Steps = string[];

//_recipe
export interface Recipe {
    id: number;
    name: string;
    ingredients: IngredientList;
    steps: Steps;
    image: string;
}
export type RecipeList = Recipe[];
export interface MyRecipe {
    name: string;
    ingredients: MyIngredientList;
    steps: string[];
}

//_recipe_filters
export interface Filters {
    search: string;
}

//EQUALS
//_primitive_array
export const primArrEq = <T>(_a: T[], _b: T[]) => {
    if (_a === _b) return true;
    if (_a.length !== _b.length) return false;
    const a = [..._a],
        b = [..._b];
    a.sort(), b.sort();
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

//_step_equal
export const stepsEq = (_a: Steps, _b: Steps) => {
    if (_a === _b) return true;
    if (_a.length !== _b.length) return false;
    const a = [..._a],
        b = [..._b];
    a.sort(), b.sort();
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

//_recipe_equal
export const recipeEq = (a: Recipe, b: Recipe) => {
    if (
        a.id !== b.id ||
        a.name !== b.name ||
        a.image !== b.image ||
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

//_ingredient_equal
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

//_recipe_filters_equal
export const filtersEq = (a: Filters, b: Filters) => {
    if (a.search !== b.search) return false;
    return true;
};
