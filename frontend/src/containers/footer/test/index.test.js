import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../index';

test('should show author sign', () => {
    const footer = shallow(<Footer />);
    const text = footer.find('.f__author').text();
    expect(text).toBe('Солдаткин Артём');
});
