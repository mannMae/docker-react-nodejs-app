import { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import { axios } from 'library/axios';

function App() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    axios
      .get('api/values')
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }, []);

  const handleChangeInput = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('api/value', { value })
      .then((res) => {
        console.log(res);
        setValue('');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <input
            placeholder="항목을 적어주세요"
            type="text"
            onChange={handleChangeInput}
          />
          <button type="submit">입력하기</button>
        </form>
      </header>
    </div>
  );
}

export default App;
