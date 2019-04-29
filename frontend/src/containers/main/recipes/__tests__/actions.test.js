import React from 'react';
import { shallow } from 'enzyme';
import { RecipesActions } from '../actions';

describe('Recipes actions', () => {
    let wrapper;
    const set_search = jest.fn(search => search);
    const get_recipes = jest.fn();
    const test_search_val = 'test';
    const props = {
        filters: {
            search: '',
        },
        set_search,
        get_recipes,
    };
    beforeEach(() => {
        wrapper = shallow(<RecipesActions {...props} />);
    });

    test('render', () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('.recipes_ac__search_it')).toHaveLength(1);
        expect(wrapper.find('.recipes_ac__search_btn')).toHaveLength(1);
        expect(wrapper.find('.recipes_ac__new_a')).toHaveLength(1);
    });

    test('set search value', () => {
        wrapper
            .find('.recipes_ac__search_it')
            .at(0)
            .simulate('change', { currentTarget: { value: test_search_val } });
        expect(set_search.mock.calls.length).toBe(1);
        expect(set_search.mock.results[0].value).toBe(test_search_val);
    });

    test('get recipes with search', () => {
        expect(wrapper.find('.recipes_ac__search_btn').props()['disabled']).toBe(true);
        wrapper = shallow(
            <RecipesActions {...{ ...props, filters: { search: test_search_val } }} />
        );
        expect(wrapper.find('.recipes_ac__search_btn').props()['disabled']).toBe(false);
        wrapper
            .find('.recipes_ac__search_btn')
            .at(0)
            .simulate('click');
        expect(get_recipes.mock.calls.length).toBe(1);
    });
});
