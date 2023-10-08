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
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const hanldeSubmit = (e) => {
    e.preventDefault();
    setValue('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={hanldeSubmit}>
          <input type="text" onChange={handleInputChange} />
          <button type="submit">작성</button>
        </form>
      </header>
    </div>
  );
}

export default App;
