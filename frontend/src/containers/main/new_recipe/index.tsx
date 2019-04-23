import React, { memo, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addRecipe } from '../../../store/recipes/actions';
import { State } from '../../../store';
import { set_image, SetImage } from '../../../store/my_recipe/actions';
import ImgUpload from '../../../components/img_upload';
import Ingridients from '../ingredients';
import Steps from '../steps';
import './style.scss';

const mapStateToProps = (state: State) => ({
    loading: state.recipes.loading,
    error: state.recipes.error,
});

const mapDispatchToProps = {
    addRecipe,
    set_image,
};

interface CmpProps {
    addRecipe: () => void;
    set_image: SetImage;
    loading: boolean;
    error: string | null;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    memo(({ addRecipe, set_image, loading, error }: CmpProps) => {
        const [image, setImage] = useState<string>('');
        useEffect(() => {
            set_image(image);
        }, [image]);
        return (
            <div className="new_recipe">
                <div className="new_recipe__t">
                    <p className="new_recipe__tx">Новый рецепт</p>
                    <Button className="new_recipe__btn" onClick={addRecipe} disabled={loading}>
                        {loading ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            <FontAwesomeIcon icon={faSave} />
                        )}
                    </Button>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}
                <ImgUpload onChange={setImage} />
                <p className="new_recipe__sub_tx">Ингредиенты</p>
                <Ingridients />
                <p className="new_recipe__sub_tx">Шаги приготовления</p>
                <Steps />
            </div>
        );
    })
);
