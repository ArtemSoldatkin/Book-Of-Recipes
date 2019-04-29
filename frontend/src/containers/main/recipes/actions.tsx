import React, { useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { Button, InputGroup, FormControl, FormControlProps } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { State } from '../../../store';
import { set_search, SetSearch } from '../../../store/filters/actions';
import { get_recipes, GetRecipes } from '../../../store/recipes/actions';
import { Filters, filtersEq } from '../../../types';

const mapStateToProps = (state: State) => ({ filters: state.filters });
const mapDispatchToProps = { set_search, get_recipes };

interface CmpProps {
    filters: Filters;
    set_search: SetSearch;
    get_recipes: GetRecipes;
}

const areEq = (pp: CmpProps, np: CmpProps) =>
    pp.set_search !== np.set_search ||
    pp.get_recipes !== np.get_recipes ||
    !filtersEq(pp.filters, np.filters)
        ? false
        : true;

export const RecipesActions = memo(({ filters, set_search, get_recipes }: CmpProps) => {
    const handle_search = () => get_recipes();
    const check_search = useMemo(() => filters.search.trim().length === 0, [filters.search]);
    return (
        <div className="recipes_ac">
            <div className="recipes_ac__search">
                <InputGroup>
                    <FormControl
                        className="recipes_ac__search_it"
                        type="text"
                        placeholder="Поиск..."
                        value={filters.search}
                        onChange={(e: React.FormEvent<FormControlProps>) =>
                            e.currentTarget.value !== undefined && set_search(e.currentTarget.value)
                        }
                    />
                    <InputGroup.Append>
                        <Button
                            className="recipes_ac__search_btn"
                            onClick={handle_search}
                            disabled={check_search}>
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
            <div className="recipes_ac__filter">Filter</div>
            <div className="recipes_ac__new">
                Не нашли нужного рецепта?
                <Link to="/new-recipe">
                    <p className="recipes_ac__new_a">Добавьте свой!</p>
                </Link>
            </div>
        </div>
    );
}, areEq);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipesActions);
