import React from 'react';

import Table from 'react-bootstrap/Table';

const ChangeTable = ({ changes, onClick }) => {
    const fieldNames = {
        professor: 'Profesor',
        room: 'Curso',
        schedule: 'Horario',
        name: 'Nombre',
        credits: 'Créditos'
    }

    const generateDescription = change => {
        if(change.type === 'CREATE') {
            return 'Sección agregada';
        }

        if(change.type === 'DELETE') {
            return 'Sección eliminada';
        }

        if(change.type === 'UPDATE') {
            return `${fieldNames[change.field]}: ${change.oldValue} => ${change.newValue}`;
        }
    }

    const _onClick = (item) => {
        if(onClick) {
            onClick(item);
        }
    }

    const getChangeComponents = () => {
        return changes.map((item, index) => (
            <tr key={index} onClick={() => _onClick(item)} style={onClick ? {cursor: 'pointer'} : null}>
                <td>{item.code}</td>
                <td>{item.section}</td>
                <td>{generateDescription(item)}</td>
                <td>{item.date}</td>
            </tr>
        ));
    }

    return (
        <Table responsive hover={onClick} size="sm">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Sección</th>
                    <th>Cambio</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
                { getChangeComponents() }
            </tbody>
        </Table>
    );
}

export default ChangeTable;