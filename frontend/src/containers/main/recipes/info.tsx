import React, { memo, useState, useEffect } from 'react';
import { Modal, Badge, ProgressBar, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Recipe, recipeEq } from '../../../types';

type CmpProps = {
    recipe: Recipe | undefined;
    show: boolean;
    on_hide: () => void;
};

const areEq = (pp: CmpProps, np: CmpProps) =>
    pp.show !== np.show ||
    pp.on_hide !== np.on_hide ||
    (pp.recipe === undefined && np.recipe !== undefined) ||
    (pp.recipe !== undefined && np.recipe === undefined) ||
    (pp.recipe && np.recipe && !recipeEq(pp.recipe, np.recipe))
        ? false
        : true;

export default memo(({ recipe, show, on_hide }: CmpProps) => {
    if (!recipe) return <></>;
    const [curStep, setCurStep] = useState<number>(0);
    const [now, setNow] = useState<number>(0);
    useEffect(() => {
        setNow((curStep / recipe.steps.length) * 100);
    }, [curStep]);

    return (
        <Modal className="recipe_info" show={show} onHide={on_hide}>
            <Modal.Header className="recipe_info__h" closeButton>
                {recipe.name}
            </Modal.Header>
            <Modal.Body className="recipe_info__b">
                {recipe.steps.length > 0 &&
                    (now !== 100 ? (
                        <>
                            <div className="recipe_info__t">Шаг: {curStep + 1}</div>
                            <div className="recipe_info__tx">{recipe.steps[curStep]}</div>
                        </>
                    ) : (
                        <div className="recipe_info__t  recipe_info-success">
                            <FontAwesomeIcon className="recipe_info__icon" icon={faUtensils} />
                            <p>Приятного аппетита!</p>
                        </div>
                    ))}
                <div className="recipe_info__ac">
                    <ButtonGroup>
                        {recipe.steps.length > 0 && now !== 0 && (
                            <Button
                                className="recipe_info__btn recipe_info__btn-back"
                                onClick={() => setCurStep(curStep - 1)}>
                                <FontAwesomeIcon className="recipe_info__icon" icon={faArrowLeft} />
                                Назад
                            </Button>
                        )}
                        {recipe.steps.length > 0 && now !== 100 && (
                            <Button
                                className="recipe_info__btn recipe_info__btn-next"
                                onClick={() => setCurStep(curStep + 1)}>
                                Дальше
                                <FontAwesomeIcon
                                    className="recipe_info__icon"
                                    icon={faArrowRight}
                                />
                            </Button>
                        )}
                    </ButtonGroup>
                    <ProgressBar now={now} label={`${now}%`} srOnly />
                </div>
            </Modal.Body>
            <Modal.Footer className="recipe_info__f">
                {recipe.ingredients.map((ingr, i) => (
                    <Badge
                        className="recipe_info__ingr"
                        key={`${Date.now()}${ingr.id}${i}`}
                        variant="primary">
                        {ingr.name}
                    </Badge>
                ))}
            </Modal.Footer>
        </Modal>
    );
}, areEq);
