import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Main from '../index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { reducer } from '../../../store';
import thunk from 'redux-thunk';
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);

test('should render to Recipes', () => {
    const wrap = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/']}>
                <Main />
            </MemoryRouter>
        </Provider>
    );
    expect(wrap.find('.err_404')).toHaveLength(0);
    expect(wrap.find('.recipes')).toHaveLength(1);
    expect(wrap.find('.new_recipe')).toHaveLength(0);
});

test('should render New Recipe', () => {
    const wrap = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/new-recipe']}>
                <Main />
            </MemoryRouter>
        </Provider>
    );
    expect(wrap.find('.err_404')).toHaveLength(0);
    expect(wrap.find('.recipes')).toHaveLength(0);
    expect(wrap.find('.new_recipe')).toHaveLength(1);
});

test('should render to Error 404', () => {
    const wrap = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/random', '/admin', '/test', '/undefined', '/null']}>
                <Main />
            </MemoryRouter>
        </Provider>
    );
    expect(wrap.find('.err_404')).toHaveLength(1);
    expect(wrap.find('.recipes')).toHaveLength(0);
    expect(wrap.find('.new_recipe')).toHaveLength(0);
});
