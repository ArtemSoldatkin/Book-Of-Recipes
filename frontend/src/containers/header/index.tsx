import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDrumstickBite } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import HeaderActions from './actions';
import './style.scss';

export default () => (
    <header className="h">
        <Link to="/">
            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip-disabled">Домой</Tooltip>}>
                <div className="h__logo">
                    <FontAwesomeIcon icon={faDrumstickBite} />
                    <p className="h__t">Книга рецептов</p>
                </div>
            </OverlayTrigger>
        </Link>
        <div className="h__ac">
            <HeaderActions />
        </div>
    </header>
);
