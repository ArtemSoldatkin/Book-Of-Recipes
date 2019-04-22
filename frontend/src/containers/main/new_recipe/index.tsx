import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { Button, FormControl } from 'react-bootstrap';
import Ingridients from '../ingredients';
import Steps from '../steps';
import './style.scss';
import { connect } from 'react-redux';
import { addRecipe } from '../../../store/recipes/actions';
import { set_image, SetImage } from '../../../store/my_recipe/actions';

const mapDispatchToProps = {
    addRecipe,
    set_image,
};

interface CmpProps {
    addRecipe: () => void;
    set_image: SetImage;
}

export default connect(
    null,
    mapDispatchToProps
)(
    memo(({ addRecipe, set_image }: CmpProps) => {
        const handle_change = (file_list: FileList | null) => {
            if (!file_list) return;
            const file = file_list[0];
            if (!file) return set_image('');
            let fr = new FileReader();
            fr.readAsDataURL(file);
            fr.onerror = () => fr.abort();
            fr.onload = () => typeof fr.result === 'string' && set_image(fr.result);
        };
        return (
            <div className="new_recipe">
                <div className="new_recipe__t">
                    <p className="new_recipe__tx">Новый рецепт</p>
                    <Button className="new_recipe__btn" onClick={addRecipe}>
                        <FontAwesomeIcon icon={faSave} />
                    </Button>
                </div>
                <input type="file" onChange={e => handle_change(e.target.files)} />
                <p className="new_recipe__sub_tx">Ингредиенты</p>
                <Ingridients />
                <p className="new_recipe__sub_tx">Шаги приготовления</p>
                <Steps />
            </div>
        );
    })
);
