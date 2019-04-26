import React from 'react';
import { shallow } from 'enzyme';
import { NewRecipeMain } from '../index';

describe('New recipe', () => {
    const add_recipe = jest.fn();
    const props = {
        add_recipe,
        set_image: jest.fn(),
        loading: false,
        error: null,
    };

    test('render', () => {
        const wrapper = shallow(<NewRecipeMain {...props} />);
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('.new_recipe__btn')).toHaveLength(1);
        expect(wrapper.find('.new_recipe__spinner')).toHaveLength(0);
        expect(wrapper.find('.new_recipe__error')).toHaveLength(0);
    });

    test('loading', () => {
        const wrapper = shallow(<NewRecipeMain {...{ ...props, loading: true }} />);
        expect(wrapper.find('.new_recipe__spinner')).toHaveLength(1);
    });

    test('error', () => {
        const wrapper = shallow(<NewRecipeMain {...{ ...props, error: 'test_error' }} />);
        expect(wrapper.find('.new_recipe__error')).toHaveLength(1);
        expect(
            wrapper
                .find('.new_recipe__error')
                .at(0)
                .text()
        ).toBe('test_error');
    });

    test('add recipe', () => {
        const wrapper = shallow(<NewRecipeMain {...props} />);
        wrapper
            .find('.new_recipe__btn')
            .at(0)
            .simulate('click');
        expect(add_recipe.mock.calls.length).toBe(1);
    });
});
