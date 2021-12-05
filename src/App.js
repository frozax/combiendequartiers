import './App.css';
import { Table, Container, Row, } from 'react-bootstrap';
import { CDQForm } from './Form.js';

function App() {


  return (
    <Container>

<Container>
  <CDQForm />
</Container>




  <Row className="justify-content-md-center">
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Date</th>
          <th>Fruit</th>
          <th>Quartiers</th>
          <th>Origine</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Citron</td>
          <td>10</td>
          <td>Inconnue</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Clémentine</td>
          <td>9</td>
          <td>Corse</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Clémentine</td>
          <td>10</td>
          <td>Espagne</td>
        </tr>
      </tbody>
    </Table>
  </Row>

    </Container>
  )
/*  return (
    <App>


</App>
  )*/
/*  return (
    <div className="App">

  <main class="px-5">
      <p>J'ai mangé </p>
      <p>Il y avait  quartiers.</p>
      <p>Origine (optionnel): </p>
    <h1>Cover your page.</h1>
    <p class="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
    <p class="lead">
      <a href="#" class="btn btn-lg btn-secondary fw-bold border-white">Learn more</a>
    </p>
  </main>

      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/
}

export default App;
