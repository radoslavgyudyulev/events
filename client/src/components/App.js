import React from 'react';

import Header from './Header';
import Navigation from './Common/Navigation';

import '../App.css';

export default () => {
    return (
        <div className="bg">
            <Header />
            <div className="container">
                <Navigation />
            </div>
        </div>
    );
};
