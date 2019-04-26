import React from 'react';
import { shallow } from 'enzyme';
import FileUploader from '../index';

describe('File upload component', () => {
    const fileName = 'test.jpeg';
    const mockFile = new File([], fileName, { type: 'image/jpeg' });
    let wrapper, file;

    beforeEach(() => {
        wrapper = shallow(<FileUploader onChange={new_file => (file = new_file)} name="asds" />);
    });

    test('render', () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('.img_upld__file')).toHaveLength(1);
        expect(wrapper.find('.img_upld__name')).toHaveLength(1);
        expect(wrapper.find('.img_upld__btn')).toHaveLength(1);
    });

    test('add file', async () => {
        expect(
            wrapper
                .find('.img_upld__name')
                .at(0)
                .props().value
        ).toBe('');
        wrapper
            .find('.img_upld__file')
            .at(0)
            .simulate('change', { target: { files: [mockFile] } });
        await new Promise(resolve => setTimeout(resolve, 1000));
        expect(
            wrapper
                .find('.img_upld__name')
                .at(0)
                .props().value
        ).toBe(fileName);
    });

    test('remove file', async () => {
        wrapper
            .find('.img_upld__file')
            .at(0)
            .simulate('change', { target: { files: [mockFile] } });
        await new Promise(resolve => setTimeout(resolve, 1000));
        wrapper
            .find('.img_upld__btn')
            .at(0)
            .simulate('click');
        expect(
            wrapper
                .find('.img_upld__name')
                .at(0)
                .props().value
        ).toBe('');
    });
});
