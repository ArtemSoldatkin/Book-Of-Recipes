import React from 'react';
import { shallow } from 'enzyme';
import Error404 from '../error404';

describe('Footer Index', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Error404 />);
    });

    test('render', () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('.err_404__tx')).toHaveLength(1);
    });

    test('check error message', () => {
        expect(
            wrapper
                .find('.err_404__tx')
                .at(0)
                .text()
        ).toBe('Страница не найдена');
    });
});
