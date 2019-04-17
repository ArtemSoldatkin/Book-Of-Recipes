import React, { memo, useState } from 'react';
import Step from './step';
import { connect } from 'react-redux';
import { State } from '../../../store';
import { addStep, editStep, removeStep } from '../../../store/my_recipe/actions';
import './style.scss';

const mapStateToProps = (state: State) => ({ my_recipe: state.my_recipe.steps });
const mapDispatchToProps = { addStep, editStep, removeStep };

interface CmpProps {
    my_recipe: string[];
    addStep: (step: string) => void;
    editStep: (id: number, step: string) => void;
    removeStep: (id: number) => void;
}

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
                <div className="steps_form">
                    <p className="steps_form__num">Шаг: {my_recipe.length + 1}</p>
                    <textarea
                        className="steps_form__it"
                        onChange={e => setStep(e.target.value)}
                        value={step}
                    />
                    <button
                        className="steps_form__btn"
                        onClick={handle_click}
                        disabled={step.length === 0}>
                        Добавить
                    </button>
                </div>
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
    })
);
