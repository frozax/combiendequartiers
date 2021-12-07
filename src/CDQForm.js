import React, { Component, createRef } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Select from 'react-select'
import { Fruits, Locations } from './Data.js'
import { AddToDb } from './Firebase.js';

export class CDQForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            advanced: false,
            fruit_id: null,
            quartiers: null,
            status: "form"
        };

        this.fruits_select = Fruits.map((fruit) => (
            { value: fruit.id, label: fruit.article + " " + fruit.name + " " + fruit.emoji }
        ));
        this.locations_select = Locations.map((location) => (
            { value: location.id, label: location.flag + "|" + location.name }
        ));

        this.fruit_ref = createRef();
        this.quartiers_ref = createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        AddToDb(this.state.fruit_id, this.state.quartiers, "");
        this._setStatus("sent");
        //this.props.db_refs.forEach( db_ref => db_ref.current.callDb() );
    };

    _setStatus(status) {
        this.setState(prevState => {
            return {
                ...prevState,
                status: status
            }
        });
    }

    toggleAdvanced(event) {
        this.setState(prevState => {
            return {
                ...prevState,
                advanced: !prevState.advanced
            }
        });
        console.log(this.state);
    }

    _isValid() {
        var new_validated = false;
        new_validated = this.state.quartiers != null && this.state.fruit_id != null ? true : false;
        return new_validated;
    }

    setFruit(fruit_id) {
        this.setState(prevState => {
            return {
                ...prevState,
                fruit_id: fruit_id
            }
        });
    }

    setQuartiers(quartiers) {
        this.setState(prevState => {
            return {
                ...prevState,
                quartiers: quartiers
            }
        });
    }

    render() {

        var row_class = "center m-2";

        if (this.state.status === "form") {
            var is_valid = this._isValid();
            var numbers = [];
            for (var i = 5; i <= 20; i++)
                numbers.push({ value: i, label: i });
            var input_number = (
                <Select aria-label="Floating label select example"
                    required
                    ref={this.quartiers_ref}
                    name="quartiers"
                    options={numbers}
                    onChange={(e) => { this.setQuartiers(e.value); }}
                    placeholder="nombre..." />
            );

            var submit_main = e => {
                e.preventDefault();
                this.handleSubmit(e);
            }

            const styles = {
                menu: (base) => ({
                    ...base,
                    width: "max-content",
                    minWidth: "100%"
                })
            };

            return (
                <Form noValidate onSubmit={submit_main}>
                    <Row className={row_class}>
                        <Form.Label column sm="auto">
                            J'ai mangé
                        </Form.Label>
                        <Col sm="auto">
                            <Select aria-label="Floating label select example"
                                required
                                name="fruit_id"
                                styles={styles}
                                ref={this.fruit_ref}
                                options={this.fruits_select}
                                onChange={(e) => { this.setFruit(e.value); }}
                                placeholder="un fruit..." />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                        <Form.Label column sm="auto">
                        </Form.Label>
                    </Row>
                    <Row className={row_class}>
                        <Form.Label column sm="auto">
                            Il y avait
                        </Form.Label>
                        <Col sm="auto">
                            {input_number}
                        </Col>
                        <Form.Label column sm="auto">
                            quartiers.
                        </Form.Label>
                    </Row>
                    <Row className={row_class}>
                        <Col>
                            <Button type="submit" className="px-5" disabled={!is_valid}>
                                Envoyer
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )
        }
        else if (this.state.status === "sent") {
            var submit_resend = e => {
                e.preventDefault();
                this._setStatus("form");
            }
            return (
                <Form noValidate onSubmit={submit_resend}>
                    <Row className={row_class}>
                        <Form.Label column sm="auto">
                            Merci !
                        </Form.Label>
                    </Row>
                    <Button type="submit" className="px-5">
                        Envoyer un autre fruit ?
                    </Button>
                </Form>
            )
        }
    }
}
