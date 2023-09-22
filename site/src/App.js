import logo from './logo.svg';
import './App.css';
import Page1 from './components/Page1';
import Map from './components/Map';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      <Page1></Page1>
      <Map></Map>
    </div>
  );
}

export default App;
