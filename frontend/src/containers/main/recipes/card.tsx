import React, { memo } from 'react';
import { Badge } from 'react-bootstrap';
import { IngredientList, ingredientListEq } from '../../../types';

interface CmpProps {
    id: number;
    name: string;
    ingredients: IngredientList;
    image: string;
    setID: (id: number) => void;
}

const areEq = (pp: CmpProps, np: CmpProps) =>
    !ingredientListEq(pp.ingredients, np.ingredients) ||
    pp.name !== np.name ||
    pp.id !== np.id ||
    pp.setID !== np.setID
        ? false
        : true;

export default memo(({ id, name, ingredients, image, setID }: CmpProps) => {
    const style = {
        background:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(' + image + ') no-repeat',
        backgroundSize: '100% 100%'
    };

    return (
        <article className="recipe_card" style={style} onClick={() => setID(id)}>           
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
    );
}, areEq);
