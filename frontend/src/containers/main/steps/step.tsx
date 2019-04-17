import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faSave } from '@fortawesome/free-regular-svg-icons';

interface CmpProps {
    id: number;
    step: string;
    remove: (id: number) => void;
    edit: (id: number, step: string) => void;
}

export default ({ id, step, remove, edit }: CmpProps) => {
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [eStep, setEStep] = useState<string>(step);
    useEffect(() => {
        if (!isEdited && eStep !== step) {
            console.log('asd');
            edit(id, eStep);
        }
    }, [isEdited, eStep]);
    return (
        <div className="step">
            <p className="step__num">Шаг: {id + 1}</p>
            {isEdited ? (
                <textarea
                    className="step__tx"
                    value={eStep}
                    onChange={e => setEStep(e.target.value)}
                />
            ) : (
                <p className="step__tx">{step}</p>
            )}
            <button className="step__btn" onClick={() => setIsEdited(!isEdited)}>
                {isEdited ? <FontAwesomeIcon icon={faSave} /> : <FontAwesomeIcon icon={faEdit} />}
            </button>
            <button className="step__btn" onClick={() => remove(id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
        </div>
    );
};
