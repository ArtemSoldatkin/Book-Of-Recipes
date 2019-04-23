import React, { memo, useState, useEffect } from 'react';
import { FormControl, FormControlProps, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faSave } from '@fortawesome/free-regular-svg-icons';
import { EditStep, RemoveStep } from '../../../store/my_recipe/actions';

interface CmpProps {
    id: number;
    step: string;
    remove: RemoveStep;
    edit: EditStep;
}

export default memo(({ id, step, remove, edit }: CmpProps) => {
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [eStep, setEStep] = useState<string>(step);
    useEffect(() => {
        if (!isEdited && eStep !== step) edit(id, eStep);
    }, [isEdited, eStep]);
    return (
        <InputGroup className="steps_form">
            <InputGroup.Prepend className="steps_form__num">Шаг: {id + 1}</InputGroup.Prepend>
            <FormControl
                as="textarea"
                rows="3"
                className="steps_form__it"
                onChange={(e: React.FormEvent<FormControlProps>) => {
                    e.currentTarget.value !== undefined && setEStep(e.currentTarget.value);
                }}
                value={eStep}
                disabled={!isEdited}
            />
            <InputGroup.Append>
                <Button className="steps_form__btn" onClick={() => setIsEdited(!isEdited)}>
                    {isEdited ? (
                        <FontAwesomeIcon icon={faSave} />
                    ) : (
                        <FontAwesomeIcon icon={faEdit} />
                    )}
                </Button>
                <Button className="steps_form__btn" onClick={() => remove(id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
            </InputGroup.Append>
        </InputGroup>
    );
});
