import React from 'react';
import Header from './containers/header';
import Main from './containers/main';
import Footer from './containers/footer';
import './App.scss';

export default () => (
    <div className="app">
        <Header />
        <Main />
        <Footer />
    </div>
);
