import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import List from '../list';

const mockStore = configureStore([thunk]);
const initialState = {
    ingredient_list: [{ id: 1, name: 'hello' }, { id: 2, name: 'test' }, { id: 3, name: '____' }],
};
const store = mockStore(initialState);

describe('Ingredient List', () => {
    let wrapper;
    const props = {
        add_new: jest.fn(),
        to_recipe: jest.fn(),
        ingredient_list: [
            { id: 1, name: 'hello' },
            { id: 2, name: 'test' },
            { id: 3, name: '____' },
        ],
    };

    beforeEach(() => {
        wrapper = shallow(<List {...props} />);
    });

    test('render', () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('.ingr')).toHaveLength(1);
    });
});
