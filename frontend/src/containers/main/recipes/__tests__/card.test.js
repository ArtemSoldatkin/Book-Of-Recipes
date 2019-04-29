import React from 'react';
import { shallow } from 'enzyme';
import RecipesCard from '../card';

describe('Recipes card', () => {
    let wrapper;
    const setID = jest.fn(id => id);
    const props = {
        id: 1,
        name: 'test',
        ingredients: [{ id: 1, name: 'test1' }, { id: 1, name: 'test1' }, { id: 1, name: 'test1' }],
        image: 'test',
        setID,
    };

    beforeEach(() => {
        wrapper = shallow(<RecipesCard {...props} />);
    });

    test('render', () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('.recipe_card')).toHaveLength(1);
        expect(wrapper.find('.recipe_card__t')).toHaveLength(1);
        expect(wrapper.find('.recipe_card__ingr')).toHaveLength(props.ingredients.length);
    });

    test('card title', () => {
        expect(
            wrapper
                .find('.recipe_card__t')
                .at(0)
                .text()
        ).toBe(props.name);
    });

    test('set id', () => {
        expect(setID.mock.calls.length).toBe(0);
        wrapper
            .find('.recipe_card')
            .at(0)
            .simulate('click');
        expect(setID.mock.calls.length).toBe(1);
        expect(setID.mock.results[0].value).toBe(props.id);
    });
});
