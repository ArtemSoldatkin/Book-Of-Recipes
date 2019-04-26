import React, { memo, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { add_recipe, AddRecipe } from '../../../store/recipes/actions';
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
    add_recipe,
    set_image,
};

interface CmpProps {
    add_recipe: AddRecipe;
    set_image: SetImage;
    loading: boolean;
    error: string | null;
}

export const NewRecipeMain = memo(({ add_recipe, set_image, loading, error }: CmpProps) => {
    const [image, setImage] = useState<string>('');
    useEffect(() => {
        set_image(image);
    }, [image]);
    return (
        <div className="new_recipe">
            <div className="new_recipe__t">
                <p className="new_recipe__tx">Новый рецепт</p>
                <Button className="new_recipe__btn" onClick={add_recipe} disabled={loading}>
                    {loading ? (
                        <Spinner
                            className="new_recipe__spinner"
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
            {error && (
                <Alert className="new_recipe__error" variant="danger">
                    {error}
                </Alert>
            )}
            <ImgUpload onChange={setImage} />
            <p className="new_recipe__sub_tx">Ингредиенты</p>
            <Ingridients />
            <p className="new_recipe__sub_tx">Шаги приготовления</p>
            <Steps />
        </div>
    );
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewRecipeMain);
