import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { State } from '../../../store';
import { getRecipes } from '../../../store/recipes/actions';
import { Recipes, GetRecipes } from '../../../store/recipes/models';
import { AsyncData } from '../../../types';
import Modal from '../../../components/modal';
import RecipeActions from './actions';
import RecipeCard from './card';
import RecipeInfo from './info';
import './style.scss';

interface CmpProps {
    recipes: AsyncData<Recipes>;
    getRecipes: GetRecipes;
}

const mapStateToProps = (state: State) => ({ recipes: state.recipes });

const mapDispatchToProps = {
    getRecipes,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    memo(({ recipes, getRecipes }: CmpProps) => {
        const [id, setID] = useState<number | null>(null);
        const [mounted, setMounted] = useState<boolean>(false);
        useEffect(() => {
            if (!mounted) getRecipes(), setMounted(true);
        }, []);
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
                            setID={setID}
                        />
                    ))}
                </div>
                <Modal open={id !== null ? true : false} onClose={() => setID(null)}>
                    <RecipeInfo recipe={recipes.data.find(recipe => recipe.id === id)} />
                </Modal>
            </>
        );
    })
);
