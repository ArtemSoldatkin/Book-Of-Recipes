import React, { memo } from 'react';
import { Modal } from 'react-bootstrap';
import { Recipe, recipeEq } from '../../../types';

type CmpProps = {
    recipe: Recipe | undefined;
    show: boolean;
    on_hide: () => void;
};

const areEq = (pp: CmpProps, np: CmpProps) =>
    pp.show !== np.show ||
    pp.on_hide !== np.on_hide ||
    (pp.recipe === undefined && np.recipe !== undefined) ||
    (pp.recipe !== undefined && np.recipe === undefined) ||
    (pp.recipe && np.recipe && !recipeEq(pp.recipe, np.recipe))
        ? false
        : true;

export default memo(({ recipe, show, on_hide }: CmpProps) => {
    if (!recipe) return <></>;
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
}, areEq);
