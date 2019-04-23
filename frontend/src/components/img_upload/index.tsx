import React, { memo, useState, useEffect } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import './style.scss';

interface CmpProps {
    onChange?: (img: string) => void;
}

export default memo(({ onChange }: CmpProps) => {
    const [name, setName] = useState<string | null>(null);
    const handle_change = (file_list: FileList | null) => {
        if (!file_list) return;
        const file = file_list[0];
        if (!file) return;
        let fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onerror = () => fr.abort();
        fr.onload = () =>
            typeof fr.result === 'string' && onChange && (onChange(fr.result), setName(file.name));
    };
    const remove = () => setName(null);
    useEffect(() => {
        onChange && !name && onChange('');
    }, [name]);
    return (
        <InputGroup className="img_upld">
            <InputGroup.Prepend>
                <label className="img_upld__btn_lbl btn btn-primary">
                    Загрузите картинку
                    <input
                        className="img_upld__file"
                        type="file"
                        accept="image/*"
                        onChange={e => handle_change(e.target.files)}
                    />
                </label>
            </InputGroup.Prepend>
            <FormControl value={name ? name : ''} disabled />
            <InputGroup.Append>
                <Button onClick={remove}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
            </InputGroup.Append>
        </InputGroup>
    );
});
