import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const ConfirmationModal = ({ body, header, modal, toggle, handleConfirm, user, actionbtn, type }) => {
    console.log(user)
    return (
        <div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> {header} </ModalHeader>
                <ModalBody style={{ paddingInline: '25px' }}>
                    <h6 style={{ fontWeight: 'lighter' }}>{body}</h6>
                    <hr />
                    {user &&
                        <>
                            <b>
                                <p className='my-1'>ID: {user?.id}</p>
                                <p className='my-1'>Name: {user?.name}</p>
                                {user?.role_name ? <p className='my-1'>Role: {user?.role_name}</p> : null}
                                {type == 'status change' ? <p className='my-1'>Current status: {user?.status == true ? <span style={{ color: 'green' }}>True</span> : <span style={{ color: 'red' }}>False</span>}</p> : null}
                            </b>
                        </>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { handleConfirm(user) }}>{actionbtn}</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

        </div>
    );
}

export default ConfirmationModal;
