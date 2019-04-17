import React from 'react';

interface Ingredient {
    id: number;
    name: string;
}

type Ingredients = Ingredient[];

interface Temp {
    id: number;
    name: string;
    steps: string[];
    ingredients: Ingredients;
}
type CmpProps = {
    recipe: Temp | undefined;
};

export default ({ recipe }: CmpProps) => {
    if (!recipe) return <div>Рецепт не найден :(</div>;
    return (
        <article className="recipe_info">
            <h1>{recipe.name}</h1>
            <div>
                {recipe.steps.map((step, i) => (
                    <div key={`${Date.now()}${i}`}>
                        <div>Шаг: {i}</div>
                        <div>{step}</div>
                    </div>
                ))}
            </div>
            <ul>
                {recipe.ingredients.map((ingr, i) => (
                    <li key={`${Date.now()}${ingr.id}${i}`}>{ingr.name}</li>
                ))}
            </ul>
        </article>
    );
};
