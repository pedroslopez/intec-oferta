import React, { useState } from 'react';

import { withRouter } from 'react-router-dom'

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import Section from '../components/Section';
import ChangeTable from '../components/ChangeTable';
import SubscribeDialog from '../components/SubscribeDialog';

import useChanges from '../hooks/useChanges';

const Home = ({ history }) => {
    const changes = useChanges();
    const [showSubscribe, setShowSubscribe] = useState(false);

    const onClickChange = (change) => {
      history.push(`/${change.code}`);
    }

    return (
        <>
          <SubscribeDialog show={showSubscribe} handleClose={() => setShowSubscribe(false)} />
          <Jumbotron className="shadow-sm mt-4 mb-4">
              <h1>Notificador de Cambios</h1>
              <p>
                  Esta herramienta fue desarrollada para proporcionar alertas a los estudiantes cuando cambia algo en relación a materias de la oferta académica.
                  Puede ver los últimos cambios realizados para una asignatura, o suscribirse para que cualquier cambio le llegue por correo.
              </p>

              <p>
                  <Button variant="primary" onClick={() => setShowSubscribe(true)}>Suscribirse</Button>
              </p>
          </Jumbotron>
          <Section title="Últimos cambios">
            {changes ? 
                <ChangeTable changes={changes} onClick={onClickChange} />
              : <div className="d-flex p-4 justify-content-center"><Spinner as="span"
                    animation="border"
                    role="status"/></div> }
          </Section>
        </>
    )
};

export default withRouter(Home);