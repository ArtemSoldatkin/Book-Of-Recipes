import React from 'react';
import { shallow } from 'enzyme';
import Header from '../index';

describe('Footer Index', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Header />);
    });

    test('render', () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('.h__t')).toHaveLength(1);
    });

    test('check title', () => {
        expect(
            wrapper
                .find('.h__t')
                .at(0)
                .text()
        ).toBe('Книга рецептов');
    });
});
