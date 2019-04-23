import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { FormControl, FormControlProps, Button, InputGroup } from 'react-bootstrap';
import { State } from '../../../store';
import {
    addStep,
    editStep,
    removeStep,
    AddStep,
    EditStep,
    RemoveStep,
} from '../../../store/my_recipe/actions';
import Step from './step';
import './style.scss';
import { primArrEq } from '../../../types';

const mapStateToProps = (state: State) => ({ my_recipe: state.my_recipe.steps });
const mapDispatchToProps = { addStep, editStep, removeStep };

interface CmpProps {
    my_recipe: string[];
    addStep: AddStep;
    editStep: EditStep;
    removeStep: RemoveStep;
}

const areEq = (pp: CmpProps, np: CmpProps) =>
    !primArrEq<string>(pp.my_recipe, np.my_recipe) ||
    pp.addStep !== np.addStep ||
    pp.editStep !== np.editStep ||
    pp.removeStep !== np.removeStep
        ? false
        : true;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    memo(({ my_recipe, addStep, editStep, removeStep }: CmpProps) => {
        const [step, setStep] = useState<string>('');
        const handle_click = () => (addStep(step), setStep(''));
        const remove_step = (id: number) => removeStep(id);
        const edit_step = (id: number, text: string) => editStep(id, text);
        return (
            <div className="steps">
                <InputGroup className="steps_form">
                    <InputGroup.Prepend className="steps_form__num">
                        Шаг: {my_recipe.length + 1}
                    </InputGroup.Prepend>
                    <FormControl
                        as="textarea"
                        rows="3"
                        className="steps_form__it"
                        onChange={(e: React.FormEvent<FormControlProps>) =>
                            e.currentTarget.value !== undefined && setStep(e.currentTarget.value)
                        }
                        value={step}
                    />
                    <InputGroup.Append>
                        <Button
                            className="steps_form__btn"
                            onClick={handle_click}
                            disabled={step.length === 0}>
                            Добавить
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
                {my_recipe.map((text, i) => (
                    <Step
                        key={`${i}${Date.now()}`}
                        id={i}
                        step={text}
                        remove={remove_step}
                        edit={edit_step}
                    />
                ))}
            </div>
        );
    }, areEq)
);
