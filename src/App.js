import './App.css';
import React, { createRef, Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CDQForm } from './CDQForm';
import { TableLatest } from './TableLatest';
import { TableCount } from './TableCount';
import { ChartQuartiers } from './ChartQuartiers';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.chart_ref = createRef();
    }

    render() {
        return (
            <Container>
                <Row className="text-center bg-cdq2">
                <h1>Combien de Quartiers ?</h1>
                </Row>

                <Row className="text-center bg-cdq">
                    <Col className="center">
                        <CDQForm chart_ref={this.chart_ref} />
                    </Col>
                </Row>

                <Row className="mt-5 pb-5 bg-cdq2">
                    <Col>
                        <ChartQuartiers fruit_id="cle" ref={this.chart_ref} />
                    </Col>
                </Row>

                <Row className="align-items-top pt-5 bg-cdq">
                    <Col className="align-items-top">
                        <TableLatest count="5" />
                    </Col>
                    <Col className="align-items-top">
                        <TableCount />
                    </Col>
                </Row>

                <Row>
                    <footer className="page-footer font-xsmall blue pt-4">
                        <div className="footer-copyright text-center py-3">
                            Sponsors: <a href="https://frozax.com/">Frozax Games</a> - <a href="https://padel4padel.com">PADEL4PADEL</a><br />
                            <a href="https://twitter.com/CDeQuartiers">Contact (Twitter)</a> - <a href="https://github.com/frozax/combiendequartiers">Contribute (Github)</a>
                        </div>
                    </footer>
                </Row>

            </Container>
        )
    }
}
