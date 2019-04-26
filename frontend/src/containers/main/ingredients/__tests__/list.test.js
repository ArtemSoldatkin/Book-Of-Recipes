import React from 'react';
import { shallow } from 'enzyme';
import IngredientsList from '../list';

describe('Ingredients list', () => {
    let wrapper;
    const ingredient_list = [
        { id: 1, name: 'test1' },
        { id: 2, name: 'test2' },
        { id: 3, name: 'test3' },
        { id: 4, name: 'test4' },
        { id: 5, name: 'test5' },
    ];
    const add_new = jest.fn(name => name);
    const to_recipe = jest.fn((id, name) => ({ id, name }));
    const props = { ingredient_list, add_new, to_recipe };
    const new_ingredient = 'test6';

    beforeEach(() => {
        wrapper = shallow(<IngredientsList {...props} />);
    });

    test('render', () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('.ingr__search')).toHaveLength(1);
        expect(wrapper.find('.ingr__search_btn')).toHaveLength(1);
        expect(wrapper.find('.ingr__lst')).toHaveLength(1);
        expect(wrapper.find('.ingr__el')).toHaveLength(ingredient_list.length);
    });

    test('add button disabled', () => {
        const search = wrapper.find('.ingr__search').at(0);
        expect(
            wrapper
                .find('.ingr__search_btn')
                .at(0)
                .props().disabled
        ).toBe(true);
        search.simulate('change', { currentTarget: { value: 'test' } });
        expect(
            wrapper
                .find('.ingr__search_btn')
                .at(0)
                .props().disabled
        ).toBe(true);
        search.simulate('change', { currentTarget: { value: new_ingredient } });
        expect(
            wrapper
                .find('.ingr__search_btn')
                .at(0)
                .props().disabled
        ).toBe(false);
    });

    test('add new ingredient', () => {
        wrapper
            .find('.ingr__search')
            .at(0)
            .simulate('change', { currentTarget: { value: new_ingredient } });
        wrapper
            .find('.ingr__search_btn')
            .at(0)
            .simulate('click');
        expect(add_new.mock.calls.length).toBe(1);
        expect(add_new.mock.results[0].value).toBe(new_ingredient);
    });

    test('add ingredient to recipe', () => {
        const el_idx = 2;
        wrapper
            .find('.ingr__el')
            .at(el_idx)
            .simulate('click');
        expect(to_recipe.mock.calls.length).toBe(1);
        expect(to_recipe.mock.results[0].value).toEqual(ingredient_list[el_idx]);
    });
});
