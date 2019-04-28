import React, { useState, useEffect } from 'react';

import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import Section from '../components/Section';
import ChangeTable from '../components/ChangeTable';
import SubscribeDialog from '../components/SubscribeDialog';

import useChanges from '../hooks/useChanges';

import { API_URL } from '../config';
const BASE_URL = API_URL + '/v1/offer/';

const Class = ({match}) => {
    const changes = useChanges(match.params.code);
    const [sections, setSections] = useState([]);
    const [classInfo, setClassInfo] = useState(null);
    const [showSubscribe, setShowSubscribe] = useState(false);
    
    useEffect(() => {
        fetch(BASE_URL + match.params.code).then(res => {
            return res.json();
        }).then(res => {
            if(res.success) {
                setSections(res.sections);
                if(res.sections.length > 0) {
                    let section = res.sections[0];
                    setClassInfo({
                        code: section.code,
                        credits: section.credits,
                        name: section.name
                    })
                } else {
                    setClassInfo(null);
                }
            } else {
                console.error(res);
            }
        });      
      }, [match.params.code]);

      const getSectionComponents = () => {
        return sections.map((item, index) => (
            <tr key={item.section}>
                <td>{item.section}</td>
                <td>{item.room}</td>
                <td>{item.professor}</td>
                <td>{item.schedule[0]}</td>
                <td>{item.schedule[1]}</td>
                <td>{item.schedule[2]}</td>
                <td>{item.schedule[3]}</td>
                <td>{item.schedule[4]}</td>
                <td>{item.schedule[5]}</td>
            </tr>
        ));
    }

    return (
        <div className="mt-4">
            <SubscribeDialog defaultCode={match.params.code} show={showSubscribe} handleClose={() => setShowSubscribe(false)} />
            <div className="p-3 my-3 d-md-flex justify-content-between text-white-50 bg-primary rounded shadow-sm">
                <div className="mb-2 mb-md-0">
                    <h6 className="text-white mb-0">Suscríbete</h6>
                    <span>Recibe notificaciones al correo cuando ocurra un cambio en esta asignatura.</span>
                </div>
                <Button variant="outline-light" onClick={() => setShowSubscribe(true)}>Suscribirse</Button>
            </div>
            {classInfo ? 
                <Section>
                    <div className="d-flex justify-content-between pb-3">
                        <span><b>{classInfo.code}</b> - {classInfo.name}</span>
                        <span className="text-right"><b>{classInfo.credits}</b> créditos</span>
                    </div>
                    <Table striped responsive size="sm">
                        <thead>
                            <tr>
                                <th>Sección</th>
                                <th>Curso</th>
                                <th>Profesor</th>
                                <th>Lunes</th>
                                <th>Martes</th>
                                <th>Miércoles</th>
                                <th>Jueves</th>
                                <th>Viernes</th>
                                <th>Sábado</th>
                            </tr>
                        </thead>
                        <tbody>
                            { getSectionComponents() }
                        </tbody>
                    </Table>
                </Section> 
            : <Alert variant="danger">Esta asignatura no se encuentra en la oferta académica.</Alert>}
            <Section title="Últimos cambios">
                <ChangeTable changes={changes} />
            </Section>
        </div>
    );
};

export default Class;