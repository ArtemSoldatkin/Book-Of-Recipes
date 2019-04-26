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
    const file_reader = (file: File): Promise<string | null> =>
        new Promise((res, rej) => {
            const fr = new FileReader();
            fr.readAsDataURL(file);
            fr.onerror = () => (fr.abort(), rej(null));
            fr.onload = () => (typeof fr.result === 'string' ? res(fr.result) : rej(null));
        });
    const handle_change = async (file_list: FileList | null): Promise<void> => {
        if (!file_list) return;
        const file = file_list[0];
        if (!file) return;
        const load = await file_reader(file);
        if (!load) return;
        onChange && onChange(load);
        setName(file.name);
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
            <FormControl className="img_upld__name" value={name ? name : ''} disabled />
            <InputGroup.Append>
                <Button className="img_upld__btn" onClick={remove}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
            </InputGroup.Append>
        </InputGroup>
    );
});
