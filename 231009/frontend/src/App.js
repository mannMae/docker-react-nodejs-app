import { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

import axios from 'axios';

function App() {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get('/api/values')
      .then((res) => setList(res.data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/value', { value })
      .then((res) => {
        console.log(res);
        setList([...list, res.data]);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>{list && list.map((p, i) => <li key={i}>{p.value}</li>)}</ul>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleInputChange} />
          <button>입력</button>
        </form>
      </header>
    </div>
  );
}

export default App;
