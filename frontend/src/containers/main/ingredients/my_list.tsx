import React, { memo } from 'react';
import { ListGroup } from 'react-bootstrap';
import { MyIngredientList } from '../../../types';
import {
    MyRemoveIngredient,
    my_edit_ingredient,
    MyEditIngredient,
} from '../../../store/my_recipe/actions';
import { connect } from 'react-redux';
import { State } from '../../../store';
import { my_remove_ingredient } from '../../../store/my_recipe/actions';
import MyElement from './my_element';

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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    memo(({ ingredient_list, edit, remove }: CmpProps) => {
        return (
            <div className="ingr ingr-my">
                <div className="ingr__ac form-control">Ингредиенты</div>
                <ListGroup className="ingr__lst ">
                    {ingredient_list.map((ingredient, i) => (
                        <MyElement
                            key={`${Date.now()}${i}${ingredient.id}`}
                            ingredient={ingredient}
                            edit={edit}
                            remove={remove}
                        />
                    ))}
                </ListGroup>
            </div>
        );
    })
);
