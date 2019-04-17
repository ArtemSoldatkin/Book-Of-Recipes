import React from 'react';
import { Modal } from 'react-bootstrap';

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
    show: boolean;
    on_hide: () => void;
};

export default ({ recipe, show, on_hide }: CmpProps) => {
    if (!recipe) return <div>Рецепт не найден :(</div>;
    return (
        <Modal show={show} onHide={on_hide}>
            <Modal.Header>{recipe.name}</Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
        </Modal>
    );
};
