import React from 'react';

interface Ingredient {
    id: number;
    name: string;
}

type Ingredients = Ingredient[];

interface CmpProps {
    id: number;
    name: string;
    ingredients: Ingredients;
    setID: (id: number) => void;
}

export default ({ id, name, ingredients, setID }: CmpProps) => (
    <article className="recipe_card" onClick={() => setID(id)}>
        <p className="recipe_card__t">{name}</p>
        <ul className="recipe_card__ingrs">
            {ingredients.map((ingr, i) => (
                <li className="recipe_card__ingr" key={`${Date.now()}${ingr.id}${i}`}>
                    {ingr.name}
                </li>
            ))}
        </ul>
    </article>
);
