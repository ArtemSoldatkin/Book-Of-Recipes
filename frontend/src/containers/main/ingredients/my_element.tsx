import React, { memo, useState, useEffect } from 'react';
import { ListGroup, FormControl, FormControlProps, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MyIngredient } from '../../../types';
import { MyRemoveIngredient, MyEditIngredient } from '../../../store/my_recipe/actions';
interface CmpProps {
    ingredient: MyIngredient;
    edit: MyEditIngredient;
    remove: MyRemoveIngredient;
}

export default memo(({ ingredient, edit, remove }: CmpProps) => {
    const [count, setCount] = useState<string>(String(ingredient.count));
    useEffect(() => {
        edit(ingredient.id, Number(count));
    }, [count]);
    return (
        <ListGroup.Item className="ingr__el">
            <p>{ingredient.name}</p>
            <FormControl
                type="number"
                value={count}
                onChange={(e: React.FormEvent<FormControlProps>) =>
                    e.currentTarget.value !== undefined && setCount(e.currentTarget.value)
                }
            />
            <Button onClick={() => remove(ingredient.id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
        </ListGroup.Item>
    );
});
