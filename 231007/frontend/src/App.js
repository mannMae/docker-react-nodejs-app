import { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [value, setValue] = useState('');

  const handleChangeInput = (e) => {
    setValue(e.target.value);
  };

  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get('/api/values')
      .then((res) => setList(res.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSumbit = (e) => {
    e.preventDefault();
    axios
      .post('/api/value')
      .then((res) => {
        if (!res.data.success) {
          return;
        }
        setValue('');
        setList([...list, res.data.value]);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {list.map((p, i) => (
            <li key={i}>{p?.value}</li>
          ))}
        </ul>
        <form onSubmit={handleSumbit}>
          <input type="text" onChange={handleChangeInput} />
          <button type="submit">등록하기</button>
        </form>
      </header>
    </div>
  );
}

export default App;
