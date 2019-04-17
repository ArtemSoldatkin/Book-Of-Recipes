import React from 'react';
import { shallow } from 'enzyme';
import Header from '../index';

test('should show title', () => {
    const header = shallow(<Header />);
    const title = header.find('.h__t').text();
    expect(title).toBe('Книга рецептов');
});
