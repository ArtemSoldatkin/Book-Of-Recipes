import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default () => {
    return (
        <div className="recipes_ac">
            <div className="recipes_ac__search">Search</div>
            <div className="recipes_ac__filter">Filter</div>
            <div className="recipes_ac__new">
                <Button>Hello</Button>
                <Link to="/new-recipe">ADD NEW</Link>
            </div>
        </div>
    );
};
