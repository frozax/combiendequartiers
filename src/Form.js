import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
import {Fruits, Locations } from './Data.js'
import NumericInput from 'react-numeric-input';
import {AddToDb} from './Firebase.js';

export const CDQForm = () => {

  const fruits_select = Fruits.map( (fruit) => (
    {value: fruit.id, label: fruit.article + " " + fruit.name + " " + fruit.emoji}
  ));
  const locations_select = Locations.map( (location) => (
    {value: location.id, label: location.flag + "|" + location.name}
  ));
    
  const [validated, setValidated] = useState(false);
  const [submit_enabled, setSubmitEnabled] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    console.log(form.fruit_id.value);
    console.log(form.quartiers.value);
    console.log(form.origin.value);
    AddToDb(form.fruit_id.value, form.quartiers.value, form.origin.value);
  };

  var update_submit_disabled = () => {
      setSubmitEnabled(true);
      console.log(submit_enabled);
  };


  return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="auto">
                  J'ai mangé
              </Form.Label>
              <Col sm="auto">
                  <Select aria-label="Floating label select example"
                      required
                      name="fruit_id"
                      options={fruits_select}
                      onChange={update_submit_disabled}
                      placeholder="choisis..." />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Col>
              <Col sm="auto">
                  <Form.Label column sm="auto">
                      , qui venait de
                  </Form.Label>
              </Col>
              <Col sm="auto">
                <CreatableSelect
                    name="origin"
                    isClearable
                    onChange={update_submit_disabled}
                    options={locations_select}
                />
              </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="auto">
                  Il y avait
              </Form.Label>
              <Col sm="auto">
                  <NumericInput
                      className="form-control"
                      //value={ 50 } 
                      min={1}
                      max={50}
                      step={1}
                      precision={0}
                      placeholder="choisis..."
                      size={5}
                      required
                      name="quartiers"
                      title="quartiers"
                      inputMode="numeric"
                      onChange={update_submit_disabled}
                  />

              </Col>
              <Form.Label column sm="auto">
                  quartiers.
              </Form.Label>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
              <Col sm="auto">
                  <Button type="submit" className="mb-2" disabled={!submit_enabled}>
                      Envoyer
                  </Button>
              </Col>
          </Form.Group>
      </Form>
  )

/*  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );*/
}
