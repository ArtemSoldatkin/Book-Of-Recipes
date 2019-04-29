import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './App';

let wrapper;

jest.mock('./containers/header', () => () => <div className="mock_header" />);
jest.mock('./containers/main', () => () => <div className="mock_main" />);
jest.mock('./containers/footer', () => () => <div className="mock_footer" />);

describe('Recipes', () => {
    beforeEach(() => {
        wrapper = mount(<App />);
    });

    test('render', () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('.mock_header')).toHaveLength(1);
        expect(wrapper.find('.mock_main')).toHaveLength(1);
        expect(wrapper.find('.mock_footer')).toHaveLength(1);
    });

    afterEach(() => {
        wrapper.unmount();
    });
});
