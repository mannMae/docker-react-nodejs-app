import { useState, useEffect } from 'react';

import axios from 'axios';

import logo from './logo.svg';
import './App.css';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

function App() {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    http
      .get('/api/values')
      .then((res) => setList(res.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    http
      .post('/api/value', { value })
      .then((res) => {
        console.log(res);
        setList([...list, res.data]);
      })
      .catch((error) => console.error(error));
  };

  const handleChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>{list && list.map((p, i) => <li key={i}>{p.value}</li>)}</ul>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChangeInput} type="text" />
          <button type="submit">입력</button>
        </form>
      </header>
    </div>
  );
}

export default App;
