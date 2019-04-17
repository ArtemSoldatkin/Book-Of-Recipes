import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Recipes from './recipes';
import NewRecipe from './new_recipe';
import Error404 from './error/error404';
import './style.scss';

export default () => (
    <div className="main">
        <Switch>
            <Route exact path="/" component={Recipes} />
            <Route path="/new-recipe" component={NewRecipe} />
            <Route exact path="*" component={Error404} />
        </Switch>
    </div>
);
