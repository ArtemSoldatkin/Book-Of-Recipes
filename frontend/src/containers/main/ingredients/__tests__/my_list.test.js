import React from 'react';
import { shallow } from 'enzyme';
import { IngredientsMyList } from '../my_list';

describe('Ingredients my_list', () => {
    let wrapper;
    const ingredient_list = [
        { id: 1, name: 'test1' },
        { id: 2, name: 'test2' },
        { id: 3, name: 'test3' },
        { id: 4, name: 'test4' },
        { id: 5, name: 'test5' },
    ];
    const remove = jest.fn(id => id);
    const props = { ingredient_list, remove };

    beforeEach(() => {
        wrapper = shallow(<IngredientsMyList {...props} />);
    });

    test('render', () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('.ingr__lst')).toHaveLength(1);
        expect(wrapper.find('.ingr__el')).toHaveLength(ingredient_list.length);
        expect(wrapper.find('.ingr__el_btn')).toHaveLength(ingredient_list.length);
    });

    test('remove ingredient', () => {
        const el_idx = 0;
        wrapper
            .find('.ingr__el_btn')
            .at(el_idx)
            .simulate('click');
        expect(remove.mock.calls.length).toBe(1);
        expect(remove.mock.results[0].value).toBe(ingredient_list[el_idx].id);
    });
});
