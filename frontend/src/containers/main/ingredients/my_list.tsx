import React, { memo } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MyIngredientList, ingredientListEq } from '../../../types';
import { MyRemoveIngredient } from '../../../store/my_recipe/actions';
import { connect } from 'react-redux';
import { State } from '../../../store';
import { my_remove_ingredient } from '../../../store/my_recipe/actions';

const mapStateToProps = (state: State) => ({
    ingredient_list: state.my_recipe.ingredients,
});

const mapDispatchToProps = { remove: my_remove_ingredient };

interface CmpProps {
    ingredient_list: MyIngredientList;
    remove: MyRemoveIngredient;
}

const areEq = (pp: CmpProps, np: CmpProps) =>
    pp.remove !== np.remove || !ingredientListEq(pp.ingredient_list, np.ingredient_list)
        ? false
        : true;

export const IngredientsMyList = memo(
    ({ ingredient_list, remove }: CmpProps) => (
        <div className="ingr ingr-my">
            <div className="form-control ingr__ac ">Ингредиенты</div>
            <ListGroup className="ingr__lst ">
                {ingredient_list.map((ingredient, i) => (
                    <ListGroup.Item className="ingr__el" key={`${Date.now()}${i}${ingredient.id}`}>
                        <p className="ingr__el_tx">{ingredient.name}</p>
                        <span className="ingr__el_btn" onClick={() => remove(ingredient.id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </span>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    ),
    areEq
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IngredientsMyList);
