import './App.css';
import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CDQForm } from './CDQForm';
import { TableLatest } from './TableLatest';
import { TableCount } from './TableCount';

export default class App extends Component {

    render() {
        return (
            <Container>

                <h1 className="center">Combien de Quartiers ?</h1>
                <Row className="text-center">
                    <Col className="center">
                        <CDQForm />
                    </Col>
                </Row>

                <Row className="align-items-top pt-5">
                    <Col className="align-items-top">
                        <TableLatest count="5" />
                    </Col>
                    <Col className="align-items-top">
                        <TableCount />
                    </Col>
                </Row>

                <Row className="center">
                        <h3 className="pt-5">Statistiques</h3>
                        <p>Les statistiques arrivent bientôt!</p>
                </Row>

                <Row>
                    <footer className="page-footer font-xsmall blue pt-4">
                        <div className="footer-copyright text-center py-3">
                            Sponsor: <a href="https://frozax.com/">Frozax Games</a><br />
                            <a href="https://twitter.com/CDeQuartiers">Contact</a>
                        </div>
                    </footer>
                </Row>

            </Container>
        )
    }
}
