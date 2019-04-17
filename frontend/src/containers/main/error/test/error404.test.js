import React from 'react';
import { shallow } from 'enzyme';
import Error404 from '../error404';

test('should show page not found', () => {
    const err_404 = shallow(<Error404 />);
    const err_text = err_404.find('.err_404__tx').text();
    expect(err_text).toBe('Страница не найдена');
});
