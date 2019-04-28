import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const SubscribeDialog = ({ show, handleClose, defaultCode }) => {


    const onSubmit = () => {
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Suscripción</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Modal body text goes here.</p>
                <Form>
                    <Form.Group as={Form.Row}>
                        <Form.Label column sm={2}>Código</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Ej. CBM206"/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Form.Row}>
                        <Form.Label column sm={2}>Email</Form.Label>
                        <Col sm={10}>
                            <Form.Control required type="email" placeholder="Correo electrónico"/>
                        </Col>
                    </Form.Group>
                    <fieldset>
                        <Form.Group>
                            <Form.Label>Notificaciones</Form.Label>
                            <Form.Row>
                                <Col sm={6}>
                                    <Form.Check 
                                        label="Cambio de horario"
                                    />
                                    <Form.Check 
                                        label="Cambio de curso"
                                    />
                                    <Form.Check 
                                        label="Cambio de profesor"
                                    />
                                </Col>
                                <Col sm={6}>
                                    <Form.Check 
                                        label="Sección agregada"
                                    />
                                    <Form.Check 
                                        label="Sección eliminada"
                                    />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                    </fieldset>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={onSubmit}>Suscribirse</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SubscribeDialog;