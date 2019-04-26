import React from 'react';
import { shallow } from 'enzyme';
import { IngredientsMain } from '../index';

describe('Ingredients index', () => {
    let wrapper;
    const props = {
        ingredients: [],
        get_list: jest.fn(),
        add_new: jest.fn(),
        to_recipe: jest.fn(),
    };

    beforeEach(() => {
        wrapper = shallow(<IngredientsMain {...props} />);
    });

    test('render', () => {
        expect(wrapper).toHaveLength(1);
    });
});
