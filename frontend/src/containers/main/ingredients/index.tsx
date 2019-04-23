import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { State } from '../../../store';
import {
    add_ingredient,
    AddIngredient,
    get_ingredient_list,
    GetIngredientList,
} from '../../../store/ingredients/actions';
import { my_add_ingredient, MyAddIngredient } from '../../../store/my_recipe/actions';
import { AsyncData, IngredientList, ingredientListEq } from '../../../types';
import Ingredients from './list';
import MyIngridients from './my_list';
import './style.scss';

const mapStateToProps = (state: State) => ({
    ingredients: state.ingredient_list,
});
const mapDispatchToProps = {
    get_list: get_ingredient_list,
    add_new: add_ingredient,
    to_recipe: my_add_ingredient,
};

interface CmpProps {
    ingredients: AsyncData<IngredientList>;
    get_list: GetIngredientList;
    add_new: AddIngredient;
    to_recipe: MyAddIngredient;
}

const areEq = (pp: CmpProps, np: CmpProps) =>
    pp.add_new !== np.add_new ||
    pp.get_list !== np.get_list ||
    pp.to_recipe !== np.to_recipe ||
    pp.ingredients.loading !== np.ingredients.loading ||
    pp.ingredients.error !== np.ingredients.error ||
    !ingredientListEq(pp.ingredients.data, np.ingredients.data)
        ? false
        : true;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    memo(({ ingredients, get_list, add_new, to_recipe }: CmpProps) => {
        const [mount, setMount] = useState<boolean>(false);
        useEffect(() => {
            !mount && get_list(), setMount(true);
        });
        return (
            <div className="ingrs">
                <Ingredients
                    ingredient_list={ingredients.data}
                    add_new={add_new}
                    to_recipe={to_recipe}
                />
                <MyIngridients />
            </div>
        );
    }, areEq)
);
