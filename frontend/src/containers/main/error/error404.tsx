import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadCry } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

export default () => (
    <div className="err_404">
        <p className="err_404__tx">Страница не найдена</p>
        <FontAwesomeIcon className="err_404__ic " icon={faSadCry} />
    </div>
);
