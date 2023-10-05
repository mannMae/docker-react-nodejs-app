import { useEffect, useState } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/values')
      .then((res) => {
        console.log(res);
        setLists(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const [lists, setLists] = useState([]);
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(value, 'submit!');

    axios
      .post('http://localhost:8080/api/value', { value })
      .then((res) => {
        if (res.data.success) {
          console.log(res);
          setLists([...lists, res.data]);
          setValue('');
        } else {
          alert('저장하기에 실패했습니다.');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          <ul>{lists && lists.map((p, i) => <li key={i}>{p.value}</li>)}</ul>
          <form className="example" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={handleInputChange}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
