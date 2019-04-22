import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, InputGroup, FormControl, FormControlProps } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default () => {
    const [search, setSearch] = useState<string>('');
    const handle_search = () => console.log('search');
    const check_search = useMemo(() => search.trim().length === 0, [search]);
    return (
        <div className="recipes_ac">
            <div className="recipes_ac__search">
                <InputGroup>
                    <FormControl
                        type="text"
                        placeholder="Поиск..."
                        value={search}
                        onChange={(e: React.FormEvent<FormControlProps>) =>
                            e.currentTarget.value !== undefined && setSearch(e.currentTarget.value)
                        }
                    />
                    <InputGroup.Append>
                        <Button onClick={handle_search} disabled={check_search}>
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
            <div className="recipes_ac__filter">Filter</div>
            <div className="recipes_ac__new">
                Не нашли нужного рецепта?
                <Link to="/new-recipe">
                    <p className="recipes_ac__new_a">Добавьте свой!</p>
                </Link>
            </div>
        </div>
    );
};
