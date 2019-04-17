import React, { memo, useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import './style.scss';

interface CmpProps {
    open: boolean;
    children: JSX.Element;
    onClose?: () => void;
}

export default memo(({ open, children, onClose }: CmpProps) => {
    const [show, setShow] = useState<boolean>(false);
    useEffect(() => setShow(open), [open]);
    const close = () => (setShow(false), onClose && onClose());
    return (
        <>
            <dialog className="modal" open={show}>
                <div className="modal__close">
                    <Button className="modal__close_btn" onClick={close}>
                        X
                    </Button>
                </div>
                {children}
            </dialog>
            <div className={`modal__sub ${show ? 'modal-show' : ''}`} onClick={close} />
        </>
    );
});
