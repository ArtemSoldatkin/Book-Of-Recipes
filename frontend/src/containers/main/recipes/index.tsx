import React, { memo, useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { State } from '../../../store';
import { get_recipes, GetRecipes } from '../../../store/recipes/actions';

import { AsyncData, RecipeList, recipeListEq } from '../../../types';
import RecipeActions from './actions';
import RecipeCard from './card';
import RecipeInfo from './info';
import './style.scss';

const mapStateToProps = (state: State) => ({ recipes: state.recipes });

const mapDispatchToProps = {
    get_recipes: get_recipes,
};

interface CmpProps {
    recipes: AsyncData<RecipeList>;
    get_recipes: GetRecipes;
}

const areEq = (pp: CmpProps, np: CmpProps) =>
    pp.get_recipes !== np.get_recipes ||
    pp.recipes.loading !== np.recipes.loading ||
    pp.recipes.error !== np.recipes.error ||
    !recipeListEq(pp.recipes.data, np.recipes.data)
        ? false
        : true;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    memo(({ recipes, get_recipes }: CmpProps) => {
        const [id, setID] = useState<number | null>(null);
        const [mounted, setMounted] = useState<boolean>(false);
        useEffect(() => {
            if (!mounted) get_recipes(), setMounted(true);
        }, []);
        const current_recipe = useMemo(() => recipes.data.find(recipe => recipe.id === id), [id]);
        return (
            <>
                <RecipeActions />
                <div className="recipes">
                    {recipes.data.map((card, i) => (
                        <RecipeCard
                            key={`${Date.now()}${card.id}${i}`}
                            id={card.id}
                            name={card.name}
                            ingredients={card.ingredients}
                            image={card.image}
                            setID={setID}
                        />
                    ))}
                </div>
                <RecipeInfo
                    recipe={current_recipe}
                    show={id !== null ? true : false}
                    on_hide={() => setID(null)}
                />
            </>
        );
    }, areEq)
);
