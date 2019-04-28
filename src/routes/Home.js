import React from 'react';

import { withRouter } from 'react-router-dom'

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import Section from '../components/Section';
import ChangeTable from '../components/ChangeTable';

import useChanges from '../hooks/useChanges';

const Home = ({ history }) => {
    const changes = useChanges();

    const onClickChange = (change) => {
      history.push(`/${change.code}`);
    }

    return (
        <>
          {}
          <Jumbotron className="shadow-sm mt-4 mb-4">
              <h1>Notificador de Cambios</h1>
              <p>
                  Esta herramienta fue desarrollada para proporcionar alertas a los estudiantes cuando cambia algo en relación a materias de la oferta académica.
                  Puede ver los últimos cambios realizados para una asignatura, o suscribirse para que cualquier cambio le llegue por correo.
              </p>
              <p>
                
              </p>
              <p>
                  <Button variant="primary">Suscribirse</Button>
              </p>
          </Jumbotron>
          <Section title="Últimos cambios">
              <ChangeTable changes={changes} onClick={onClickChange} />
          </Section>
        </>
    )
};

export default withRouter(Home);