import { ReactNode } from 'react';
import Modal from 'react-modal';
import {Props} from 'react-modal';

type ModalProps = Props &{
    children?: ReactNode;
}



export function OpenModal({children,...props}:ModalProps){
    return(
        <Modal 
        isOpen={props.isOpen}
        onAfterOpen={props.onAfterOpen}
        onRequestClose={props.onRequestClose}
        contentLabel="Example Modal"
        style={props.style}
    >
        {children}
        </Modal>
    )
}