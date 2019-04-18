import React, { memo } from 'react';
import { Badge } from 'react-bootstrap';
import { IngredientList, ingredientListEq } from '../../../types';

interface CmpProps {
    id: number;
    name: string;
    ingredients: IngredientList;
    setID: (id: number) => void;
}

const areEq = (pp: CmpProps, np: CmpProps) =>
    !ingredientListEq(pp.ingredients, np.ingredients) ||
    pp.name !== np.name ||
    pp.id !== np.id ||
    pp.setID !== np.setID
        ? false
        : true;

export default memo(
    ({ id, name, ingredients, setID }: CmpProps) => (
        <article className="recipe_card" onClick={() => setID(id)}>
            <p className="recipe_card__t">{name}</p>
            <div className="recipe_card__ingrs">
                {ingredients.map((ingr, i) => (
                    <Badge
                        variant="primary"
                        className="recipe_card__ingr"
                        key={`${Date.now()}${ingr.id}${i}`}>
                        {ingr.name}
                    </Badge>
                ))}
            </div>
        </article>
    ),
    areEq
);
