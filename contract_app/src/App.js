import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './components/Login';
import ContractoePage from '../src/components/ContractorPage'
import AdminPage from '../src/components/AdminPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<>sadfasdfasf</>}/>
        <Route path="/Login" element={<LoginPage />}/>
        <Route path="/dashboard" element={<ContractoePage />}/>
        <Route path="/AdminPage" element={<AdminPage />}/>


      </Routes>
      </BrowserRouter>

      {/* <header className="App-header">
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
      </header> */}
    </div>
  );
}

export default App;
