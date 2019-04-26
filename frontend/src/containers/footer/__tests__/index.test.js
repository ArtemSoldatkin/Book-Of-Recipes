import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../index';

describe('Footer Index', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Footer />);
    });

    test('render', () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('.f__author')).toHaveLength(1);
    });

    test('check sign', () => {
        expect(
            wrapper
                .find('.f__author')
                .at(0)
                .text()
        ).toBe('Солдаткин Артём');
    });
});
