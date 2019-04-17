import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import './style.scss';

export default () => (
    <footer className="f">
        <div className="f__sign">
            <FontAwesomeIcon icon={faCopyright} />
            <p className="f__author">Солдаткин Артём</p>
        </div>
    </footer>
);
