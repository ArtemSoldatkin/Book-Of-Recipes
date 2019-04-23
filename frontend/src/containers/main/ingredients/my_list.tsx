import React, { memo } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MyIngredientList, ingredientListEq } from '../../../types';
import {
    MyRemoveIngredient,
    my_edit_ingredient,
    MyEditIngredient,
} from '../../../store/my_recipe/actions';
import { connect } from 'react-redux';
import { State } from '../../../store';
import { my_remove_ingredient } from '../../../store/my_recipe/actions';

const mapStateToProps = (state: State) => ({
    ingredient_list: state.my_recipe.ingredients,
});

const mapDispatchToProps = {
    remove: my_remove_ingredient,
    edit: my_edit_ingredient,
};

interface CmpProps {
    ingredient_list: MyIngredientList;
    remove: MyRemoveIngredient;
    edit: MyEditIngredient;
}

const areEq = (pp: CmpProps, np: CmpProps) =>
    pp.edit !== np.edit ||
    pp.remove !== np.remove ||
    !ingredientListEq(pp.ingredient_list, np.ingredient_list)
        ? false
        : true;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    memo(({ ingredient_list, remove }: CmpProps) => {
        return (
            <div className="ingr ingr-my">
                <div className="form-control ingr__ac ">Ингредиенты</div>
                <ListGroup className="ingr__lst ">
                    {ingredient_list.map((ingredient, i) => (
                        <ListGroup.Item
                            className="ingr__el"
                            key={`${Date.now()}${i}${ingredient.id}`}>
                            <p className="ingr__el_tx">{ingredient.name}</p>
                            <span className="ingr__el_btn" onClick={() => remove(ingredient.id)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        );
    }, areEq)
);
