import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import { API_URL } from '../config';
const ROUTE = API_URL + '/v1/subscription';

const SubscribeDialog = ({ show, handleClose, defaultCode }) => {
    const [validated, setValidated] = useState(false);
    const [subscribing, setSubscribing] = useState(false);

    const [fields, setFields] = useState({
        code: defaultCode || '',
        email: ''
    });
    
    const [options, setOptions] = useState({
        UPDATE_schedule: true,
        UPDATE_room: true,
        UPDATE_professor: true,
        CREATE: true,
        DELETE: true
    });

    const formRef = React.createRef();

    const _handleChange = (e) => {
        const item = e.target.name;

        if(e.target.type === 'checkbox') {
            setOptions({...options, [item]: e.target.checked});
        } else {
            setFields({...fields, [item]: e.target.value});
        }
    }

    const _handleFormSubmit = (event) => {
        event.preventDefault();
        subscribe();
    }

    const checkOptions = () => {
        return (Object.values(options).some(x => x === true));
    }

    const subscribe = async () => {
        setValidated(true);
        
        if(formRef.current.checkValidity() === false) {
            return;
        }

        let reqBody = {
            ...fields,
            options: Object.keys(options).filter(x => options[x])
        };

        setSubscribing(true);
        try {
            let response = await fetch(ROUTE, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(reqBody)
            });

            if(response.status !== 200) {
                throw Error();
            } 
    
            response = await response.json();
            if(!response.success) {
                throw Error();
            }

            handleClose();

        } catch(err) {
            alert('Ocurrió un error al suscribirse. Por favor intente mas tarde.');
        } finally {
            setSubscribing(false);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Suscripción</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={_handleFormSubmit} ref={formRef} validated={validated}>
                    <Form.Group as={Form.Row}>
                        <Form.Label column sm={2}>Código</Form.Label>
                        <Col sm={10}>
                            <Form.Control required name="code" value={fields.code} onChange={_handleChange} type="text" placeholder="Ej. CBM206"/>
                            <Form.Control.Feedback type="invalid">
                                Debe ingresar un código de asignatura.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Form.Row}>
                        <Form.Label column sm={2}>Email</Form.Label>
                        <Col sm={10}>
                            <Form.Control name="email" required value={fields.email} onChange={_handleChange} type="email" placeholder="Correo electrónico"/>
                            <Form.Control.Feedback type="invalid">
                                Debe ingresar un correo electrónico.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Notificaciones</Form.Label>
                        {validated && !checkOptions() ? <div class="text-danger">Debe seleccionar al menos un cambio para el cual recibir notificaciones.</div> : null}
                        <Form.Row>
                            <Col sm={6}>
                                <Form.Check 
                                    name="UPDATE_schedule"
                                    required={!checkOptions()}
                                    checked={options.UPDATE_schedule} 
                                    onChange={_handleChange}
                                    label="Cambio de horario"
                                />
                                <Form.Check 
                                    name="UPDATE_room"
                                    required={!checkOptions()}
                                    checked={options.UPDATE_room} 
                                    onChange={_handleChange}
                                    label="Cambio de curso"
                                />
                                <Form.Check 
                                    name="UPDATE_professor"
                                    required={!checkOptions()}
                                    checked={options.UPDATE_professor} 
                                    onChange={_handleChange}
                                    label="Cambio de profesor"
                                />
                            </Col>
                            <Col sm={6}>
                                <Form.Check 
                                    name="CREATE"
                                    required={!checkOptions()}
                                    checked={options.CREATE} 
                                    onChange={_handleChange}
                                    label="Sección agregada"
                                />
                                <Form.Check 
                                    name="DELETE"
                                    required={!checkOptions()}
                                    checked={options.DELETE} 
                                    onChange={_handleChange}
                                    label="Sección eliminada"
                                />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" disabled={subscribing} onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" disabled={subscribing} onClick={subscribe}>
                    {subscribing ? 
                        <><Spinner as="span"
                            animation="border"
                            size="sm"
                            role="status"/> Suscribiendo...</>: 'Suscribirse'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SubscribeDialog;