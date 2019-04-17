import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';

import Ingridients from '../ingredients';
import Steps from '../steps';
import './style.scss';
import { connect } from 'react-redux';
import { addRecipe, getRecipes } from '../../../store/recipes/actions';

const mapDispatchToProps = {
    addRecipe,
    getRecipes,
};

interface CmpProps {
    addRecipe: () => void;
    getRecipes: () => void;
}

export default connect(
    null,
    mapDispatchToProps
)(({ addRecipe, getRecipes }: CmpProps) => (
    <div className="new_recipe">
        <div className="new_recipe__t">
            <p className="new_recipe__tx">Новый рецепт</p>
            <button className="new_recipe__btn" onClick={addRecipe}>
                <FontAwesomeIcon icon={faSave} />
            </button>
        </div>
        <input type="file" />
        <p className="new_recipe__sub_tx">Ингредиенты</p>
        <Ingridients />
        <p className="new_recipe__sub_tx">Шаги приготовления</p>
        <Steps />
    </div>
));
