import React from 'react';
import { mount } from 'enzyme';
import { RecipesMain } from '../index';

let wrapper;

const data = [
    { name: 'test1', ingredients: [], steps: [] },
    { name: 'test2', ingredients: [], steps: [] },
    { name: 'test3', ingredients: [], steps: [] },
];
const get_recipes = jest.fn();
const props = { recipes: { error: null, loading: false, data }, get_recipes };

jest.mock('../actions', () => () => <div className="mock_actions" />);
jest.mock('../card', () => () => <div className="mock_card" />);
jest.mock('../info', () => () => <div className="mock_info" />);

describe('Recipes', () => {
    beforeEach(() => {
        wrapper = mount(<RecipesMain {...props} />);
    });

    test('get recipes', () => {
        expect(get_recipes.mock.calls.length).toBe(1);
    });

    test('render', () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('.mock_actions')).toHaveLength(1);
        expect(wrapper.find('.mock_card')).toHaveLength(data.length);
        expect(wrapper.find('.mock_info')).toHaveLength(1);
    });

    afterEach(() => {
        wrapper.unmount();
    });
});
