import { Ingridients } from '../ingredients/model';

export interface Recipe {
    id: number;
    name: string;
    ingredients: Ingridients;
    steps: string[];
}

export type Recipes = Recipe[];

export type GetRecipes = () => void;
