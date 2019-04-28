import React, { useState } from 'react';

import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Search = ({ history }) => {
    const [searchValue, setSearchValue] = useState('');
    
    const _handleSearchChange = (event) => {
        setSearchValue(event.target.value.toUpperCase());
    }

    const _handleSearchSubmit = (event) => {
        event.preventDefault();
        onSearch();
    }

    const onSearch = () => {
        if(searchValue) {
            history.push('/' + searchValue);
            setSearchValue('');
        }
    }

    return (
        <Form inline onSubmit={_handleSearchSubmit}>
            <FormControl value={searchValue} onChange={_handleSearchChange} 
                type="text" placeholder="Código de asignatura" className="mr-sm-2" />
            <Button variant="outline-light" onClick={onSearch}>Buscar</Button>
        </Form>
    );
}

export default withRouter(Search);