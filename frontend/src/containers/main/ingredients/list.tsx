import React, { memo, useState, useMemo } from 'react';
import { ListGroup, InputGroup, FormControl, Button, FormControlProps } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IngredientList, ingredientListEq } from '../../../types';
import { MyAddIngredient } from '../../../store/my_recipe/actions';
import { AddIngredient } from '../../../store/ingredients/actions';

interface CmpProps {
    ingredient_list: IngredientList;
    add_new: AddIngredient;
    to_recipe: MyAddIngredient;
}

const areEq = (pp: CmpProps, np: CmpProps) =>
    pp.add_new !== np.add_new ||
    pp.to_recipe !== np.to_recipe ||
    !ingredientListEq(pp.ingredient_list, np.ingredient_list)
        ? false
        : true;

export default memo(({ ingredient_list, add_new, to_recipe }: CmpProps) => {
    const [search, setSearch] = useState<string>('');
    const filtered_data = useMemo(
        () => ingredient_list.filter(ingredient => ingredient.name.includes(search)),
        [search, ingredient_list.length]
    );
    const handle_click = () => filtered_data.length === 0 && add_new(search);
    return (
        <div className="ingr">
            <InputGroup className="ingr__ac">
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    type="text"
                    value={search}
                    onChange={(e: React.FormEvent<FormControlProps>) =>
                        e.currentTarget.value !== undefined && setSearch(e.currentTarget.value)
                    }
                />
                <InputGroup.Append>
                    <Button onClick={handle_click} disabled={filtered_data.length !== 0}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </InputGroup.Append>
            </InputGroup>
            <ListGroup className="ingr__lst">
                {filtered_data.map((ingredient, i) => (
                    <ListGroup.Item
                        className="ingr__el"
                        key={`${Date.now()}${i}${ingredient.id}`}
                        onClick={() => to_recipe(ingredient.id, ingredient.name, 0)}>
                        {ingredient.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}, areEq);
