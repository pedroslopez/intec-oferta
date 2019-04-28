import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import Home from './routes/Home';
import Class from './routes/Class';

import Search from './components/Search';

const App = () => {
    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="md">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Notificador de Cambios</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="mr-auto"/>
                        <Search/>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/:code" exact component={Class} />
                </Switch>
            </Container>
        </Router>

    );
}

export default App;